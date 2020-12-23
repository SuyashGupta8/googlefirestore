
import {
  DBConfig
} from './type';

import { Firestore } from '@google-cloud/firestore';
const limit:number = 10;

var dbInstance:DBConfig;

(function(){
let counter= 0;
dbInstance = {
   counter:0,
   connections:buildConnections(),
   getConnection : function(){
      let conn = dbInstance.connections[counter];
      if(dbInstance.counter === (limit - 1)){
        counter = 0;
      }else{
        counter++;
      }
      return conn;
    }
  };
function buildConnections(){
 let connections = [];
for(let i = 0; i < limit; i++){
  connections[i] = new Firestore();
}
return connections;
}
}());

export default dbInstance;