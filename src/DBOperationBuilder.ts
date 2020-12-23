import DBOperations from './DBOperations';
import {ThrowableErrors} from './ThrowableError';
import {queryFields} from './utils';

import {
	 FireStoreOperation,
	 FireStoreData
} from './type';

const { v4: uuidv4 } = require('uuid');


class DBOperationBuilder extends DBOperations{

	constructor(private operations:FireStoreOperation, 
		protected data:FireStoreData){
			super(operations.collection, data);
	}

	async  build(){
	
		let res;
	
		if(!this.operations){
			return `perations ${ThrowableErrors.UNDEFINED_ERROR}` ;
		}
	
		let action = this.operations.action;
	
		if(!action){
			return `actios ${ThrowableErrors.UNDEFINED_ERROR}`
		}
	
		switch(this.operations.action) {
			case 'query':
				res = await this.query();
			  break;
			case 'create':
				res = await this.create();
			  break;
			default:
				res = `action ${ThrowableErrors.INVALID}`;
		  }
	
		return res;
	}

	create(){

		if(!this.data || !this.data.length){
			return `FireStore notification data ${ThrowableErrors.UNDEFINED_ERROR} `
		}

		this.buildBatch();
        this.data.forEach(msg => {
            this.batch.set(this.database.collection(this.collection).doc(uuidv4()), msg);
        });
        this.commitBatch();
	}
	
	async query(){

        if(!this.data){
			return `FireStore query data ${ThrowableErrors.UNDEFINED_ERROR} `
		}
        
        console.log(this.collection);
        //this.buildFindQuery();
        let query =  await this.buildFindQuery();
        let res = await query.get();

        res.forEach(function (doc) {
            console.log(doc.id, ' => ', doc.data());
        });

        return res;
	}
	
	 async buildFindQuery(){
        let query =  this.database.collection(this.collection);
        
        

		Object.keys(queryFields).forEach(async field =>{
			if(this.data[field]){
                console.log('this field', this.data[field]);

                console.log('query is '+ ` query.where('${queryFields[field].field}',
                '${queryFields[field].defaultComparision}',  ${this.data[field]})` );

                query.where(`${queryFields[field].field}`,
                `${queryFields[field].defaultComparision}`,  `${this.data[field]}`);

                
			}
        });
        
        console.log("querry obtained is......................", JSON.stringify(query));
		return query;
	}
}

export default DBOperationBuilder;