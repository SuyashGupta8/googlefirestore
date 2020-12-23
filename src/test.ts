import DBOperations from './DBOperations';
import {FireStoreService} from './index'
var sinon = require('sinon');
 var chai = require('chai');
 const assert = require("assert");


describe("Testing FireStore DB Service", function() {

    describe("Testing Function FireStore", function() {
  
        beforeEach(async() => {
            sinon.stub(DBOperations.prototype, 'query').callsFake(() => {
                return 11
              });
          
            //var queryObj = sinon.fake();
            //new DBOperations().query() = queryObj;
        });

        it('test', async ()=>{
            let msg = await FireStoreService({
                users:[{userId:121}, {userId:233}, {userId:666}],
                storeId:222,
                collections:'notifications',
                validTo:new Date(),
                action:'query'
            });
            assert.equals(msg, '11');
        })
          
          

        afterEach(() => {
            
          });
      });
    });
  
