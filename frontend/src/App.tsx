import { useKeycloak } from "@react-keycloak/web";
import "./App.css";
import { useEffect, useState } from "react";
import { ChatBox, ChatBoxMessage, Header } from "./components";

interface MessageFromServer {
  type: "message" | "ban" | "kick" | "login" | "users";
  payload: string; // in case of type login, ban or kick - the user
}

export interface User {
  id: number;
  username: string;
  sessionId?: string;
}

export interface Message {
  id: number;
  user: User;
  message: string;
  created_at: Date;
}

function App() {
  const { keycloak, initialized } = useKeycloak();
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [kickedMessage, setKickedMessage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (initialized && keycloak.authenticated && !ws) {
      const ws = new WebSocket("ws://localhost:3001");

      ws.onopen = () => {
        //Keycloak Id
        const userId = keycloak.tokenParsed?.sub;
        const sessionId = keycloak.tokenParsed?.sid;
        const username = keycloak.tokenParsed?.preferred_username;

        ws.send(
          JSON.stringify({
            type: "login",
            payload: JSON.stringify({
              id: userId,
              sid: sessionId,
              username: username
            }),
          })
        );
      };

      ws.onmessage = (event) => {
        const message: MessageFromServer = JSON.parse(event.data);

        // On message send
        if (message.type === "message") {
          const payload = JSON.parse(message.payload);

          // Save messages temporarily
          setMessages((prevState) => {
            return [
              ...prevState,
              {
                ...payload,
                id: prevState.length + 1,
              },
            ];
          });

          // On user login
        } else if (message.type === "users") {
          const payload = JSON.parse(message.payload);

          const users = payload.map((user: string) => JSON.parse(user));

          setConnectedUsers(users);
        } else if (message.type === "kick") {
          console.log(message.payload);
          setKickedMessage(message.payload);

        } else if (message.type === "ban") {
          console.log(message.payload);

          setKickedMessage(message.payload);
        }
      };

      setWs(ws);
    }

    if (initialized && keycloak.authenticated) {
      fetch("http://localhost:3000/chat", {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          ContentType: "application/json",
          Accepts: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setMessages(data);
        });
    }

    return () => {
      console.log("Closing WebSocket connection...");
      if (ws) {
        ws.close();
        console.log(ws);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized, keycloak.authenticated]);

  if (!initialized) {
    return <h2>Loading...</h2>;
  }

  const handleSend = (data: string) => {
    if (data.trim()) {
      const message = {
        id: -1,
        message: data.trim(),
        user: {
          id: parseInt(keycloak.tokenParsed?.sub ?? "-1", 10),
          username: keycloak.tokenParsed?.preferred_username ?? "Anonymous",
        },
        created_at: new Date(),
      };

      if (ws) {
        ws.send(
          JSON.stringify({ type: "message", payload: JSON.stringify(message) })
        );
      }

      setMessages([...messages, message]);
    }
  };

  const handleKickUser = (user: User) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "kick",
          payload: JSON.stringify(user),
        })
      );
    }
  };

  const handleBanUser = (user: User) => {
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "ban",
          payload: JSON.stringify(user),
        })
      )
    }
  };

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />

      <div className="flex flex-col h-full items-center justify-center">
        <ChatBox
          connectedUsers={connectedUsers}
          onSendMessage={(data: string) => handleSend(data)}
          onKick={handleKickUser}
          onBan={handleBanUser}
          kickedMessage={kickedMessage}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <ChatBoxMessage
                key={index}
                message={msg.message}
                created_at={msg.created_at}
                user={msg.user}
                id={msg.id}
              />
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </ChatBox>
      </div>
    </div>
  );
}

export default App;
