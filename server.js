require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/ask-ai", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await fetch("https://api.ollama.com/v1/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OLLAMA_KEY}`
            },
            body: JSON.stringify({
                model: "llama3",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("Backend läuft 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server läuft auf Port " + PORT);
});