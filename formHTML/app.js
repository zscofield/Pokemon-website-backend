const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const {PubSub} = require('@google-cloud/pubsub');

app.use(bodyParser.urlencoded( { extended: false}));
app.use(bodyParser.json());

// Set the name of pubsub topic
const pubsub_topic = "Pokemon";

// ROUTES
app.get('/', (req, res) => {
  //res.status(200).send('Hello, world!');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/subscribe' , async ( req , res ) => {
    const email = req.body.email_address;
    const types = req.body.pokemon_type;

    const pubSubClient = new PubSub();
    const message_data = JSON.stringify({
        email_address:email,
        pokemon_type: types
    });
    const dataBuffer = Buffer.from(message_data);
    const messageID = await pubSubClient.topic(pubsub_topic).publish(dataBuffer);

    console.log("Message ID : " + messageID);
    res.status(200).send("Thanks for registering for TravelDeals! " + messageID ); 
});

app.listen(port, () => {
  console.log(`TravelDeals Web App listening on port ${port}`);
});