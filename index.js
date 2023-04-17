const {Firestore} = require('@google-cloud/firestore');


//entry point
exports.readFirestoreDocument = (doc , context) => { 
    //"doc" references the document that was created in firestore
    //This is the doc that triggered the GCF
    const version = process.env.K_REVISION;
    console.log("Running Cloud Function Version " + version );

    const firestore = new Firestore(); 

    //output the entire document
    console.log(doc);
    console.log("Document contents: " );
    console.log(doc.value.fields); 

 
   





}