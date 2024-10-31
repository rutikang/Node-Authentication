const express = require('express')
const app = express()

const bcrypt = require('bcrypt')

const salt = 10

app.use(express.json())

const users = []

app.get('/posts', (req,res)=>{
    res.json('Backend connected')
})

app.post('/create_users', async (req, res) =>{
    
    try{

        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const user = {
            username : req.body.username,
            password : hashPassword
        }  
        users.push(user)
        res.sendStatus(201)
    }
    catch{
        res.sendStatus(500)
    }
})

app.get('/login', async (req,res)=>{
    const user = users.find(ss => ss.username === req.body.username)

    if (user == null){
        return res.sendStatus(403)
    }
    try{

        if (await bcrypt.compare(req.body.password, user.password)){
            return res.sendStatus(200)
        }
        else{
            return res.sendStatus(403)
        }
    }
    catch{
        res.sendStatus(500)
    }
})



app.listen(8083, ()=>{
    console.log('Listening')
})