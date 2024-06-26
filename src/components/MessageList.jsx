"use client"

import { pusherClient } from "@/libs/pusher/client";
import { useEffect, useState } from "react";

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const channel = pusherClient.subscribe("private-chat")
    
    channel.bind(
      "evt::test",
      (data) => {
        console.log("test", data);
        setMessages([...messages, data]);
      }
    );

    return () => {
      channel.unbind();
    };
  }, [messages]);

  const handleTestClick = async () => {
    const response = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "test" }),
    });
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="flex flex-col">
      <button
        className="w-[240px] bg-slate-600 hover:bg-slate-500 rounded p-2 m-2"
        onClick={handleTestClick}
      >
        Test
      </button>

      <div>
        {messages.map((message) => (
          <div
            className="border border-slate-600 rounded p-2 m-2"
            key={message.date}
          >
            {message.message}
            <br />
            {message.date}
          </div>
        ))}
      </div>
    </div>
  );
}
