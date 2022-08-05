const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

const accountSid = "AC5f766cdfab24a10637d09e7693abb918";
const authToken = "fc6b8f144db7339bacb65ce0f3aa5c69";
const client = new twilio(accountSid, authToken);
const app = express();

app.use(cors());
app.get('/', (req, res) =>{
    res.send('Welcome to the Express Server');
})

app.get('/send-text', (req, res) => {
    const {recipient, textmessage} = req.query;
    try{
        client.messages.create({
            body: textmessage,
            to: '+'+recipient,
            from: "+12183003275"
        }).then((message)=> {
            console.log(message.body);
            res.send(message.body)
        }).catch(error=>console.log(error.message))
    }catch(error){
        console.log(error.message);
        res.send(error.message);
    }
    res.send("complete");
})

app.post('/validate-user', (req, res)=> {
    const {phoneNumber} = req.query;
    try{
        client.validationRequests.create({
            friendlyName: "Verifing Outgoing Caller ID",
            phoneNumber: "",
        })
    }
    catch{}

})
app.listen(8080, ()=>console.log("Running on port 8080."))