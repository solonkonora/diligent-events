// src/app/api/generateBookingReply/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const { clientName, eventType, eventDate, services } = await req.json();
  const OPENAI_API_KEY = process.env.OpenAI_API_KEY;
  const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

  const prompt = `Write a friendly, professional email reply to a client named ${clientName} confirming their booking for a ${eventType} on ${eventDate}. Mention the included services: ${services}. Express gratitude and offer further assistance.`;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an event manager assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      reply: response.data.choices[0].message.content.trim(),
    });
  } catch (error: any) {
    console.error(
      "OpenAI email generation error:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        reply:
          "Thank you for your booking! We have received your request and will follow up soon.",
      },
      { status: 500 }
    );
  }
}
