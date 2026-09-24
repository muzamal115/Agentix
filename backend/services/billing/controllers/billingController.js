import { PLANS } from "../config/Plans.js"
import safepayClient from "../config/safepay.js"
import Payment from "../models/paymentModel.js"
import axios from "axios"
import crypto from "crypto"

export const createOrder = async (req, res) => {
    try {
        const { plan } = req.body
        const userId = req.headers["x-user-id"]
        const selectedPlan = PLANS[plan]

        if (!selectedPlan) {
            return res.status(404).json({ message: "Plan not found" })
        }

        if (selectedPlan.amount === 0) {
            return res.status(200).json({
                message: "Free Plan activated",
                plan: selectedPlan
            })
        }

        const amount = selectedPlan.amount * 100

        const session = await safepayClient.payments.session.setup({
            merchant_api_key: process.env.SAFE_PAY_PUBLIC_KEY,
            intent: "CYBERSOURCE",
            mode: "payment",
            currency: "PKR",
            amount,
        })

        const tracker = session.data.tracker.token

        await Payment.create({
            userId,
            orderId: tracker,
            amount: selectedPlan.amount,
            credits: selectedPlan.credits,
            plan: selectedPlan.id,
            currency: "PKR",
            status: "created"
        })

        const authTokenResponse = await safepayClient.client.passport.create()
        const authToken = authTokenResponse.data

        const checkoutURL = await safepayClient.checkout.createCheckoutUrl({
            tracker,
            tbt: authToken,
            env: "sandbox",
            source: "hosted",
            redirect_url: `${process.env.FRONTEND_URL}/payment/success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`
        })

        return res.status(200).json({ checkoutURL, plan: selectedPlan })

    } catch (error) {
        console.log("create order error:", error)
        return res.status(500).json({ message: `create order error ${error.message}` })
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const rawBodyString = req.body.toString('utf8')
        const receivedSignature = req.headers["x-sfpy-signature"]
        const webhookSecret = process.env.SAFE_PAY_WEBHOOK_SECRET

        const expectedSignature = crypto
            .createHmac('sha512', webhookSecret)
            .update(rawBodyString)
            .digest('hex')

        if (receivedSignature !== expectedSignature) {
            console.log("Invalid webhook signature — rejected")
            return res.status(400).json({ message: "Invalid signature" })
        }

        const payload = JSON.parse(rawBodyString)

        if (payload.type !== "payment.succeeded") {
            return res.status(200).json({ received: true })
        }

        const tracker = payload.data.tracker

        const paymentDoc = await Payment.findOne({ orderId: tracker })

        if (!paymentDoc) {  
            return res.status(404).json({ message: "Payment not found" })
        }

        if (paymentDoc.status === "paid") {
            return res.status(200).json({ received: true, message: "Already processed" })
        }

        paymentDoc.status = "paid"
        await paymentDoc.save()

        if (process.env.AUTH_SERVICE_URL) {
            try {
                await axios.post(`${process.env.AUTH_SERVICE_URL}/update-plan`, {
                    userId: paymentDoc.userId,
                    plan: paymentDoc.plan,
                    credits: paymentDoc.credits
                })
            } catch (err) {
                console.log("Auth Service update error:", err.message)
            }
        }

        return res.status(200).json({ received: true })

    } catch (error) {
        console.log("Webhook verification error:", error)
        return res.status(400).json({ message: "Webhook verification failed" })
    }
}