"use client";

import React from "react";
import { useSocket } from "../hooks/useSocket";

const WebhookEvents: React.FC = () => {
  const events = useSocket("newEvent");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Webhook Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index} className="border-b py-2">
            <pre>{JSON.stringify(event, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebhookEvents;
