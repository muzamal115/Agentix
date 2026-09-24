import axios from "axios";
import { graph } from "../graph/graph.js";
import { addMessage } from "../config/memory.js";

export const agent = async (req, res,next) => {
  try {
       console.log("CONTENT TYPE:", req.headers["content-type"])
    console.log("BODY:", req.body)
    console.log("FILE:", req.file)
    const { prompt, conversationId, agent } = req.body;
    const file=req.file
     const userId=req.headers["x-user-id"]
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "user",
      content: prompt,

    });

    const result = await graph.invoke({
      conversationId,
      prompt,
      agent,
      userId,
      file:file
    });
  
    const response = result.aiResponse;
    console.log("GRAPH IMAGES:", result.images);
    await addMessage(conversationId, "user", prompt);
    await addMessage(conversationId, "assistant", response);
    console.log("SENDING IMAGES TO CHAT SERVICE:", result.images);
    await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
      conversationId,
      role: "assistant",
      content: response,
      images: result?.images,
      artifacts:result?.artifacts
    });

    return res.status(200).json({
      answer: response,
      images: result?.images,
      artifacts:result?.artifacts
    });
  } catch (error) {
  console.log("AGENT ERROR:", error)
  console.log("AGENT ERROR RESPONSE:", error.response?.data)
    next(error)
  }
};  
