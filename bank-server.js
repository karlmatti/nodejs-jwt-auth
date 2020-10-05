require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

app.use(express.json())

const balances = [
    {
        username: 'Mary',
        balance: 1031.12,
        currency: 'EUR'
    },
    {
        username: 'Tim',
        balance: 8503.63,
        currency: 'USD'
    }
]

app.get('/balance', authenticateToken, (req, res) => {
    res.json(balances.filter(balance => balance.username === req.user.name))
})



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) { return res.sendStatus(401)}

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(3000)