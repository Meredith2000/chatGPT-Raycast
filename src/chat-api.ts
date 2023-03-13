import fetch from "node-fetch";
import {Message, Response} from "../index";

export const chat = async (msg:Message[], url: string, apiKey: string):Promise<Response> => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": msg
    })
  })
  return await response.json() as Promise<Response>
}


