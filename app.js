require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/ask-openai', (req, res) => {
    try {
        let content = req.body.question || 'Ola'
        res.json({ response: content })      
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})