//Required Libraries/ functions
const {Firestore} = require('@google-cloud/firestore');


//Trigger is Topic: Pokemon 
exports.CollectNewPokemon = async (message, context) => {
    const firestore = new Firestore();  

    const version = process.env.K_REVISION
    console.log(`Running Cloud Function ${version}`);

    // Parses the plain text message into an object
    const incomingMessage = Buffer.from(message.data, 'base64').toString('utf-8'); // Allows us to read the message as a string
    const parsedMessage = JSON.parse(incomingMessage); // Parses string into an object

    // change .watch_regions to type
    let w_r;
    if (Array.isArray(parsedMessage.Type) == false) {
        w_r = new Array(parsedMessage.Type);
    }else {
        w_r =parsedMessage.Type;
    }
  
    // CREATE A JSON OBJECT
    var subscriberData = {
    name: parsedMessage.Name, 
    type: parsedMessage.Type,
    hp: parsedMessage.HP, 
    favattack: parsedMessage.Fav.Attack,
    height: parsedMessage.Height, 
    weight: parsedMessage.Weight,
    image: parsedMessage.Image, 
     };
  
  console.log(JSON.stringify(subscriberData, null, 2));
  
  // WRITE THE JSON OBJECT TO FIRESTORE
  var collectionRef = firestore.collection('Pokemon');
  var documentRef = await collectionRef.add(subscriberData);
  console.log(`Document created: ${documentRef.id}`);
  
  };