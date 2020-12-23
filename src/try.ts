//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");

/* firebase.initializeApp({
    apiKey: '### FIREBASE API KEY ###',
    authDomain: '### FIREBASE AUTH DOMAIN ###',
    projectId: '### CLOUD FIRESTORE PROJECT ID ###'
  }); */


  const Firestore = require('@google-cloud/firestore'),
  { v4: uuidv4 } = require('uuid'),
  limit = 10;

  console.log("process environment ", process.env);
  
 var dbInstance;

 (function(){
   let counter = 0;
   dbInstance = {};
   dbInstance.connections = buildConnections();
   dbInstance.counter = counter;
   dbInstance.getConnection = function(){
     let conn = dbInstance.connections[counter];
     if(dbInstance.counter === (limit - 1)){
       counter = 0;
     }else{
       counter++;
     }
     return conn;
   }

   function buildConnections(){
     let connections = [];
    for(let i = 0; i < 10; i++){
      connections[i] = new Firestore();
    }
    return connections;
   }
 }());

module.exports = {
  dbInstance : dbInstance
}
 

  
  // Set the value of 'NYC'
  // const nycRef = db.collection('cities').doc('NYC');
  // batch.set(nycRef, {name: 'New York City'});
  
  // // Update the population of 'SF'
  // const sfRef = db.collection('cities').doc('SF');
  // batch.update(sfRef, {population: 1000000});
  
  // // Delete the city 'LA'
  // const laRef = db.collection('cities').doc('LA');
  // batch.delete(laRef);
  
  // // Commit the batch
  // await batch.commit();
//   dbInstance.getConnection().collection("users").add({
//     first: "Suyash",
//     last: "Gupta",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

// addDocument([{
//        first: "vish",
//       last: "surya",
//       born: 1815
// },{
//   first: "Suyash3",
//       last: "Gupta",
//       born: 1815
// }]);
