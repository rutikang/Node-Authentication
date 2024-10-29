
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const salt = 10
app.use(express.json())

const users = []

app.get('/users', (req,res) =>{
    res.json(users)
})

app.post('/users', async (req, res)=>{

    try{

    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = { name:req.body.name, password:hashPassword}
    users.push(user)
    res.status(201).send()
    }
    catch{
        res.status(500).send()
    }
})

app.get('/users/login', async (req,res)=>{

    const user = users.find(user =>(
          user.name == req.body.name
    ))
    if (user == null){
        res.status(400).send("User not found")
    }
    try{
        if (await bcrypt.compare(req.body.password, user.password)){
            res.send("Login Success")
        }
        else{
            res.status(401).send("Access Denied")
        }
    }
    catch{
        res.status(500).send()
    }
})


app.listen(8082, ()=>{
    console.log('Listening')
})