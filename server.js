require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Ollama } = require("ollama");

const app = express();

app.use(cors());
app.use(express.json());

const ollama = new Ollama({
    host: "https://ollama.com",
    headers: {
        Authorization: "Bearer " + process.env.OLLAMA_KEY,
    },
});

app.post("/api/ask-ai", async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const response = await ollama.chat({
            model: "gpt-oss:120b",   // oder dein gewünschtes Modell
            messages: [
                { role: "user", content: prompt }
            ],
            stream: false   // wichtig! Kein Streaming für Express
        });

        res.json(response);

    } catch (err) {
        console.error("Ollama Error:", err);
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