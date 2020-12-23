import DBOperationBuilder from './DBOperationBuilder';
import {ThrowableErrors} from './ThrowableError';

import {
	FireStoreOperation,
	FireStoreData

} from './type';


export const FireStoreService = async (operations:FireStoreOperation,
	data:FireStoreData) => {

	return await new DBOperationBuilder(operations, data).build();
}



let  data =   {
	"notificationMethod": "e-mail",
	"notificationType": "Account Reactivated",
	"bannerId": "11",
	"locale": "fr",
	"saveNotification": true,
	"userId": 121,
	"patientId": "123e4567-e89b-12d3-a456-426614174000",
	"batchId": "123e4567-e89b-12d3-a456-426614174000",
	"groupNotificationId": "123e4567-e89b-12d3-a456-426614174000",
	"parentGroupId": "123e4567-e89b-12d3-a456-426614174000",
	"prescriptionNumber": "000000000",
	"storeId": 222,
	"templateId": "d-0000000000000000",
	"from": "drx-notifications@loblaw.ca",
	"to": "test@yopmail.com",
	"subject": "Your Account has been reactivated",
	"status":true,
	"dynamicTemplateData": {
	  "templateObjects": "..."
	}
}


/* FireStoreService({notifications:[data], action:"create"}).then(res => {
	console.log('res ob: ', res);
}).catch(err => {
	console.log('err ob: ', err);
}); */ 

FireStoreService({
	collection:'notifications',
	action:'query'
},{
	users:[121, 233, 666],
	storeId:222,
}).then(res => {
	console.log('res ob: ', JSON.stringify(res));
}).catch(err => {
	console.log('err ob: ', err);
});

