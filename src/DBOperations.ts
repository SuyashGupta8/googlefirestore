import {ThrowableErrors} from './ThrowableError';
import dbInstance from "./connectionBuilder";
import {FireStoreConfigs} from './utils';

import {
    FireStoreData
} from './type';


class DBOperations {

    protected database;
    protected batch;

    constructor(protected collection: String , 
        protected data: FireStoreData
        ){
            this.database = dbInstance.getConnection();
            this.collection = collection || process.env.collection || FireStoreConfigs.collection;
    }

    buildBatch(){
        this.batch = this.database.batch();
    }

    commitBatch(){
        this.batch.commit().then(res => {
            console.log("Document Written, Res Obtained: ", res);
        }).catch(err => {
            console.log("Document Writing Failed, Error: " , err);
        }); 
    }

}

export default DBOperations;