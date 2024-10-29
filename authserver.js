
require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

let refreshTokens = []

app.post('/token', (req,res)=>{
    const token = req.body.token
    if (token == null){
        return res.sendStatus(401)
    }
    if (!refreshTokens.includes(token)){
        return res.sendStatus(403)
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err){
            return res.sendStatus(403)
        }
        const accessToken = generateAccesstoken({name:user.name})
        res.json( {accessToken:accessToken})
    })
})

app.delete('/refreshtoken', (req,res)=>{
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', (req,res) =>{
 
    const username = req.body.username
    const user = {name : username}


    const accessToken = generateAccesstoken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken:refreshToken})
})


function generateAccesstoken(user){
    return (jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s'}))
}



app.listen(8086, ()=>{
    console.log('Listening')
})