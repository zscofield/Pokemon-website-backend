const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore(); 
require('dotenv').config();

const sgMail = require('@sendgrid/mail');


sgMail.setApiKey('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');

//entry point
exports.readFirestoreDocument = (event , context) => { 
    
    const version = process.env.K_REVISION;
    console.log("Running Cloud Function Version " + version );
    //name , type , hp , favAttack , height, weight , image
    var subscriberRef = firestore.collection('subscribers'); // change this Pokemon to reference the new pokemon collection
    console.log("Created sub Ref ");
    subscriberRef.get().then((querySnapshot) => { //This loops through each document in that collection
        console.log("snapshot started ");
        querySnapshot.forEach((doc) => { // On each document -- do logic
            console.log("Looping through each document" );
            
                doc.data().type.forEach((type) => { // 
                    
                    console.log(type + "And" +event.value.fields.type.stringValue );
                    if(type === event.value.fields.type.stringValue){
                    const msg = {
                        to: doc.data().email, 
                        from: 'zdscofie@iu.edu', 
                        subject: "Pokemon Index Update! " ,
                        text: "A new " + event.value.fields.type.stringValue + "  type of pokemon has been created in the PokemonIndex!" ,
                      };
                      
                      sgMail.send(msg)
                        .then(() => {
                          console.log('Email sent');
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }  
                
                });       
            });
        }); 
    };
 
   





