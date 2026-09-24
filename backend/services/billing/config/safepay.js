import safepay from "@sfpy/node-core"
import dotenv from "dotenv"

dotenv.config()

const safepayClient = safepay(
    process.env.SAFE_PAY_SECRET_KEY,
    {
        authType: "secret",
        host: "https://sandbox.api.getsafepay.com"
    }
)
 

export default safepayClient