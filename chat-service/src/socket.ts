import axios from "axios";
import { WebSocketServer, WebSocket, RawData } from "ws";
import dotenv from "dotenv";

dotenv.config();
const port = 3001;

/**
 * Represents a user who has been banned from the chat service.
 *
 * @interface BannedUser
 * @property {string} username - The username of the banned user.
 * @property {string} banned_at - The timestamp when the user was banned.
 */
interface BannedUser {
  username: string;
  banned_at: string;
}

const backendUrl = `http://${process.env.BACKEND_HOST}:${process.env.BACKEND_PORT}/bannedusers`;

console.log("Backend URL:", backendUrl);

interface Message {
  type: "message" | "ban" | "kick" | "login" | "users";
  payload: string; // in case of type login, ban or kick - the user
}

// Map of connected users with their WebSocket connection
const usersConnected = new Map<WebSocket, string>();

// Create a WebSocket server
const wss = new WebSocketServer({ port }, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});

// Handle WebSocket connections
wss.on("connection", async (ws: WebSocket) => {
  console.log("A client connected");

  // Listen for messages from the client
  ws.on("message", async (message: RawData) => {
    // Convert data to readable string
    const data = message.toString();

    console.log("Received message:", data);

    // Parse readable string to Message Interface
    const parsedMessage: Message = JSON.parse(data);

    if (parsedMessage.type === "login") {
      const user = JSON.parse(parsedMessage.payload);

      // Checking for banned users before login
      await checkAndBanUser(user, ws);

      // Add new user to map
      usersConnected.set(ws, parsedMessage.payload);

      sendUsersConnected();

      return;
    }

    if (parsedMessage.type === "kick") {
      const user = JSON.parse(parsedMessage.payload);

      const sender = JSON.parse(usersConnected.get(ws) as string);

      // Check if the sender is trying to kick themselves
      if (sender.username === user.username) {
        console.log("User tried to kick themselves, action not allowed.");
        return;
      }

      console.log(sender.username, " tries to Kick User: ", user.username);

      for (const [clientWs, userWs] of usersConnected) {
        const username = JSON.parse(userWs).username;

        if (username === user.username) {
          // Send kick message to user
          clientWs.send(
            JSON.stringify({
              type: "kick",
              payload: "You have been kicked from the chat",
            })
          );

          // Close connection of kicked user
          clientWs.close();

          break;
        }
      }

      return;
    }

    if (parsedMessage.type === "ban") {
      const user = JSON.parse(parsedMessage.payload);

      const sender = JSON.parse(usersConnected.get(ws) as string);

      // Check if the sender is trying to kick themselves
      if (sender.username === user.username) {
        console.log("User tried to ban themselves, action not allowed.");
        return;
      }

      for (const [clientWs, userWs] of usersConnected) {
        const username = JSON.parse(userWs).username;

        // Close connection of banned user
        if (username === user.username) {
          // Send ban message to user
          clientWs.send(
            JSON.stringify({
              type: "ban",
              payload: "You have been banned from the chat",
            })
          );

          // Close connection of banned user
          clientWs.close();

          // Save banned user
          const res = await saveBannedUser(username);

          if (res) {
            console.log("User:", res, "successfully banned");
          }

          break;
        }
      }

      return;
    }

    // Optionally broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify(parsedMessage));
      }
    });
  });

  // Handle client disconnection
  ws.on("close", async () => {
    console.log("client " + usersConnected.get(ws) + " disconnected");
    usersConnected.delete(ws);
    sendUsersConnected();
  });
});

/**
 * Sends the list of connected users to all clients.
 */
const sendUsersConnected = () => {
  const users = [];

  for (const [ws, username] of usersConnected) {
    users.push(username);
  }

  const payload: Message = {
    type: "users",
    payload: JSON.stringify(users),
  };

  wss.clients.forEach((client) => {
    client.send(JSON.stringify(payload));
  });
};

/**
 * Saves a user into banned users list, for preventing enter in again.
 */
const saveBannedUser = async (
  username: string
): Promise<BannedUser | undefined> => {
  try {
    const user = {
      username: username,
    };

    console.log("Sending:", user, "to backend:", backendUrl);

    const res = await axios.post(backendUrl, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Checks if a user is banned and bans them if necessary.
 */
const checkAndBanUser = async (user: any, ws: WebSocket) => {
  try {
    const bannedUsers = (await fetchBannedUsers()) || [];

    const bannedUser = bannedUsers.find(
      (bannedUser: BannedUser) => bannedUser.username === user.username
    );

    if (bannedUser) {
      console.log("Banned user tried to login:", user.username);
      ws.send(
        JSON.stringify({
          type: "ban",
          payload: `You have been banned from the chat since [${new Date(
            bannedUser.banned_at
          ).toLocaleDateString()}]`,
        })
      );
      ws.close();
      return;
    }
  } catch (error) {
    console.error("Error fetching banned users:", error);
  }
};

/**
 * Fetches the list of all banned users from the backend.
 */
const fetchBannedUsers = async (): Promise<BannedUser[] | undefined> => {
  try {
    const res = await axios.get(backendUrl, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    console.error(error);
  }
};
