require('dotenv').config()
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { OpenAI } = require('openai')
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.use(express.json())
app.use(cors(corsOptions))

app.post('/ask-openai', async (req, res) => {
    try {
        let content = req.body.question || 'Ola'
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            response_format: {"type": "json_object"},
            messages: [
                { role: "system", content: "You are a helpful assistant designed to output JSON." },
                { role: "user", content: content}
            ],
            temperature: 2,
            max_tokens: 150,
            top_p: 0,
            frequency_penalty: 1,
            presence_penalty: 1,
        })
        res.send(response.choices[0].message.content)      
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})