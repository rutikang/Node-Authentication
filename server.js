
const express =  require('express')
const app = express()

app.use(express.json())

// middleware
const people = [
    {'name' : 'dan',
        'age' : '26',
        'role' : 'student'
    },
]



function checkrole(req, res, next){
    if(req.body.role == 'admin'){
        next()
    }
    else{
        res.status(401).json('YOU DONT HAVE ACCESS')
    }
}

//
app.get('/students/:id', (req,res)=>{   

    const id = req.params.id
    res.json('Hello '+id)

} )

app.get('/grades', checkrole, (req,res)=>{
    const grades = [
        {'Dan' : '100',
            'Jane' : '98',
            'Nana' : '97',
            'Opio' : '72'
        },
    ]
    res.json(grades)
})


app.listen(3030,()=>{
    console.log('listenin')
})