var dbInstance = require('./connectionBuilder').dbInstance;
const config = require('./config.json'),
{ v4: uuidv4 } = require('uuid');


class DBOperations {
    constructor(docs){
        this.docs = docs;
        this.getCollection();
    }

    getCollection(){
        this.collection = process.env.collection || config.collection;
    }

    buildBatch(){
        this.db = dbInstance.getConnection();
        this.batch = this.db.batch();
    }

    create(){
        this.buildBatch();
        this.docs.forEach(docm => {
            this.batch.set(this.db.collection(this.collection).doc(uuidv4()), docm);
        });
        this.commitBatch();
    }

    commitBatch(){
        this.batch.commit().then( res => {
            console.log("Document Written, Res Obtained: ", res);
        }).catch(err => {
            console.log("Document Writing Failed, Error: " , err);
        }); 
    }

    update(){
        //const sfRef = db.collection('cities').doc('SF');
        //batch.update(sfRef, {population: 1000000});

// Delete the city 'LA'
           // const laRef = db.collection('cities').doc('LA');
             //batch.delete(laRef);

    }

    query(presNum, userId, batchId ){
        db = dbInstance.getConnection();
        let col = db.collection(this.collection);
        let docs;

        if(presNum && userId && batchId){
            docs = col.where(prescriptionNumber, '=', prescriptionNumber)
            .where('userId', '=', userId).where('batchId', '=', batchId);
        }else if(presNum && userId){
            docs = col.where(prescriptionNumber, '=', prescriptionNumber)
            .where('userId', '=', userId);
        }else if(presNum && batchId){
            docs = col.where(prescriptionNumber, '=', prescriptionNumber)
            .where('batchId', '=', batchId);
        }else if(userId && batchId){
            docs = col.where('userId', '=', userId)
            .where('batchId', '=', batchId);
        }else if(userId){
            col.where('userId', '=', userId);
        }else if(batchId){
            docs = col.where('batchId', '=', batchId);
        }else if(presNum){
            docs = col.where('prescriptionNumber', '=', presNum);
        }

        console.log('docs obtained is', docs);
        return docs;
    }

}
module.exports = DBOperations;