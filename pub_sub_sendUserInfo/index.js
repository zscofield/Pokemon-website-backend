const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();


require('dotenv').config();
const sgMail = require('@sendgrid/mail');


exports.sendUserTypes = async (message , context ) => {
    const version = process.env.K_REVISION;
    console.log("Running cloud function version : " + version);

//Read the value of the message
const incomingMessage = Buffer.from(message.data,'base64').toString('utf-8');
console.log("Encrypted Message " + incomingMessage);
let parsedMessage = JSON.parse(incomingMessage);
console.log("Decrypted Message" + JSON.stringify(parsedMessage));
let ptypes;
if(Array.isArray(parsedMessage.pokemon_type) == false){
    ptypes = new Array(parsedMessage.pokemon_type);
}
else { // make sure types is read as an array even if one type is selected
    ptypes = parsedMessage.pokemon_type;
}


sgMail.setApiKey('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');
const msg = {
    email: parsedMessage.email_address,
    pokemonTypes: ptypes
};
console.log(msg);



let collectionRef = firestore.collection('pokemon'); 
console.log("pokemon collection found");
    let documentRef = await collectionRef.add(msg); console.log("message added to collectionRef");
    console.log("Document Created : " + documentRef.id); 



if(error.response){
    console.error(error.response.body);
}



} ; 