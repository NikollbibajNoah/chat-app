import express from "express";
import { db } from "./knex";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  db.count("* as chat_count")
    .from("ChatLog")
    .then((result) => {
      res.send(`Total chats: ${result[0]["chat_count"]}`);
    });
});

app.get("/chat", (req, res) => {
  db.select("*")
    .from("ChatLog")
    .then((result) => {
      res.send(result);
    });
});

/**
 * GET endpoint that retrieves all banned users from the database.
 */
app.get("/bannedusers", async (req, res) => {
  try {
    const bannedUsers = await db('BannedUsers').select('*');

    res.status(200).json(bannedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching banned users" });
  }
});

/**
 * POST endpoint that adds a user to the list of banned users.
 */
app.post("/bannedusers", async (req, res) => {
  try {
    const { username } = req.body;

    await db.insert({ username }).into("BannedUsers");

    res.status(201).json({ message: "User successfully banned" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding banned user" });
  }
});

/**
 * DELETE endpoint that deletes all banned users from the database.
 */
app.delete("/bannedusers", async (req, res) => {
  try {
    const deletedCount = await db("BannedUsers").del();
    await db("BannedUsers").del();

    res.status(200).json({ 
      message: "All banned users deleted successfully",
      deleted: deletedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting banned users" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
