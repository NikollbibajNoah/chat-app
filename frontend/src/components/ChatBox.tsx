import { Button, Input } from "antd";
import React, { useState } from "react";
import { UserDisplay } from "./UserDisplay";
import { User } from "../App";

export interface ChatBoxProps {
  children?: React.ReactNode;
  connectedUsers: User[];
  onSendMessage: (message: string) => void;
  onKick: (user: User) => void;
  onBan: (user: User) => void;
  kickedMessage?: string | undefined;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  children,
  connectedUsers,
  onSendMessage,
  onKick,
  onBan,
  kickedMessage,
}) => {
  const [inputMessage, setInputMessage] = useState<string>("");

  return (
    <div className="relative w-[80%] border border-gray-300 rounded-lg p-4">
      {kickedMessage && (
        <div className="w-full h-full bg-black opacity-60 absolute top-0 left-0 flex justify-center items-center">
          <span className="text-white text-xl">
            {kickedMessage}
          </span>
        </div>
      )}
      <div className="border-b border-gray-300 p-2 flex items-center">
        <h1>Chat</h1>
        <div className="ml-auto">
          <UserDisplay
            connectedUsers={connectedUsers}
            onKick={onKick}
            onBan={onBan}
            kickedMessage={kickedMessage}
          />
        </div>
      </div>
      <div className="h-96 overflow-y-auto p-2 break-words">{children}</div>
      <div className="flex gap-2 border border-gray-300 rounded-lg p-2">
        <Input
          placeholder="Type in Your Message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          disabled={kickedMessage ? true : false}
          onPressEnter={() => {
            onSendMessage(inputMessage);
            setInputMessage("");
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            onSendMessage(inputMessage);
            setInputMessage("");
          }}
          disabled={kickedMessage ? true : false}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
