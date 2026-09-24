import pptxgen from "pptxgenjs"

export const generatePpt = async (data) => {

    return new Promise((resolve, reject) => {

        try {

            const pptx = new pptxgen()

            // Presentation settings
            pptx.layout = "LAYOUT_WIDE"

            pptx.author = "Agentix"
            pptx.company = "Agentix"
            pptx.subject = data.title || "AI Generated Presentation"
            pptx.title = data.title || "AI Generated Presentation"

            // Theme
            pptx.theme = {
                headFontFace: "Aptos Display",
                bodyFontFace: "Aptos",
                lang: "en-US"
            }


            // =========================
            // TITLE SLIDE
            // =========================

            const titleSlide = pptx.addSlide()

            titleSlide.background = {
                color: "0F172A"
            }

            // Accent line
            titleSlide.addShape(pptx.ShapeType.rect, {
                x: 0,
                y: 0,
                w: 13.33,
                h: 0.08,
                fill: {
                    color: "6366F1"
                },
                line: {
                    color: "6366F1"
                }
            })

            // Title
            titleSlide.addText(
                data.title || "Untitled Presentation",
                {
                    x: 1,
                    y: 2,
                    w: 11.3,
                    h: 1,
                    fontSize: 32,
                    bold: true,
                    color: "FFFFFF",
                    align: "center",
                    margin: 0,
                    fit: "shrink"
                }
            )


            // Subtitle
            if (data.subtitle) {

                titleSlide.addText(
                    data.subtitle,
                    {
                        x: 1.5,
                        y: 3.25,
                        w: 10.3,
                        h: 0.6,
                        fontSize: 17,
                        color: "A5B4FC",
                        align: "center",
                        margin: 0,
                        fit: "shrink"
                    }
                )

            }


            // Small label
            titleSlide.addText(
                "AI-GENERATED PRESENTATION",
                {
                    x: 4.5,
                    y: 5.2,
                    w: 4.3,
                    h: 0.3,
                    fontSize: 9,
                    bold: true,
                    color: "94A3B8",
                    align: "center",
                    charSpacing: 1.5,
                    margin: 0
                }
            )


            // =========================
            // CONTENT SLIDES
            // =========================

            const slides = Array.isArray(data.slides)
                ? data.slides
                : []


            slides.forEach((item, index) => {

                const slide = pptx.addSlide()

                slide.background = {
                    color: "0F172A"
                }


                // Top accent
                slide.addShape(
                    pptx.ShapeType.rect,
                    {
                        x: 0,
                        y: 0,
                        w: 13.33,
                        h: 0.08,
                        fill: {
                            color: "6366F1"
                        },
                        line: {
                            color: "6366F1"
                        }
                    }
                )


                // Slide number
                slide.addText(
                    `0${index + 1}`,
                    {
                        x: 0.7,
                        y: 0.6,
                        w: 0.6,
                        h: 0.3,
                        fontSize: 10,
                        bold: true,
                        color: "818CF8",
                        margin: 0
                    }
                )


                // Slide title
                slide.addText(
                    item.title || "Untitled Slide",
                    {
                        x: 1.4,
                        y: 0.5,
                        w: 10.8,
                        h: 0.65,
                        fontSize: 25,
                        bold: true,
                        color: "FFFFFF",
                        margin: 0,
                        fit: "shrink"
                    }
                )


                // Divider
                slide.addShape(
                    pptx.ShapeType.line,
                    {
                        x: 0.75,
                        y: 1.45,
                        w: 11.8,
                        h: 0,
                        line: {
                            color: "334155",
                            width: 1
                        }
                    }
                )


                // Points
                const points = Array.isArray(item.points)
                    ? item.points
                    : []


                points.slice(0, 6).forEach(
                    (point, pointIndex) => {

                        const yPosition =
                            1.9 + pointIndex * 0.75


                        // Bullet circle
                        slide.addShape(
                            pptx.ShapeType.ellipse,
                            {
                                x: 0.85,
                                y: yPosition + 0.08,
                                w: 0.12,
                                h: 0.12,
                                fill: {
                                    color: "818CF8"
                                },
                                line: {
                                    color: "818CF8"
                                }
                            }
                        )


                        // Point text
                        slide.addText(
                            String(point),
                            {
                                x: 1.15,
                                y: yPosition,
                                w: 11,
                                h: 0.55,
                                fontSize: 16,
                                color: "CBD5E1",
                                margin: 0,
                                fit: "shrink",
                                valign: "mid"
                            }
                        )

                    }
                )


                // Footer
                slide.addText(
                    "AGENTIX",
                    {
                        x: 0.75,
                        y: 7.05,
                        w: 1.2,
                        h: 0.2,
                        fontSize: 8,
                        bold: true,
                        color: "64748B",
                        margin: 0
                    }
                )


                slide.addText(
                    `${index + 2}`,
                    {
                        x: 12,
                        y: 7.05,
                        w: 0.5,
                        h: 0.2,
                        fontSize: 8,
                        color: "64748B",
                        align: "right",
                        margin: 0
                    }
                )

            })


            // =========================
            // GENERATE PPTX BUFFER
            // =========================

            pptx.write({
                outputType: "nodebuffer"
            })
                .then((buffer) => {

                    resolve(buffer)

                })
                .catch((error) => {

                    reject(error)

                })


        } catch (error) {

            reject(error)

        }

    })

}