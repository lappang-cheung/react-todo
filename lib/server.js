const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/', (req,res) => {
    res.send('Hello world');
})

app.get('/todos', (req,res) => {
    res.status(200).json({
        message: 'connected'
    })
})

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})