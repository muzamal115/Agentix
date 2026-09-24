import type { Artifact } from "./artifact";

export interface Message {
    _id: string;
    conversationId: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    updatedAt: string;
    images:string[],
     artifacts:Artifact[]
}

export interface SendMessageResponse {
    answer: string;
    images: string[];
    artifacts:Artifact[]
}