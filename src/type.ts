export type EnvVariable = string | undefined;

export type CallbackFunction = (error: Error | null, message?: string) => void;

export interface PubSubMessage {
	data: string;
	attributes?: object;
	messageId: string;
	publishTime: string;
	orderingKey: string;
}

export interface EventContext {
	eventId: string;
	timestamp: string;
	eventType: string;
	resource?: object;
}

export interface RequiredSMSFields {
	from: string;
	body: string;
	to: string;
}

export interface CommonMessageFields {
	notificationMethod: string;
	notificationType: string;
	bannerId: BannerEnum;
	locale: 'en-CA' | 'fr-CA';
	saveNotification: boolean;
	userId: string;
	patientId: string;
	batchId: string;
	groupNotificationId: string;
	parentGroupId: string;
	prescriptionNumber: string;
	storeId: string;
}

export interface RequiredEmailFields {
	from: string;
	templateId: string;
	to: string;
	subject: string;
	dynamicTemplateData: object;
}


export interface FireStoreNotifications{
	notificationType: string,
	notificationMethod: string,
	patientEmailId: string,
	patientMobileNo: string 
	patientId: string,
	userId: string,
	batchId : string,
	groupNotificationId: string,
	parentGroupId: string,
	prescriptionNumber: string,
	storeId: string,
	bannerId: string,
	locale: string,
	notificationSentAt?: Date 
}


export interface FireStoreGet{
	users:(string | number)[],
	storeId:string | number
}

export interface FireStoreOperation {
	collection:string,
	action:'query' | 'create'
}

export interface DBConfig{
	connections: object[],
	counter: number,
    getConnection:Function
}

export interface QueryFieldTypes {
	users:{
		type:string,
		defaultComparision:string,
		field:string
	},
	userId:{
		type:string,
		defaultComparision:string,
		field:string
	},
	storeId:{
		type:string,
		defaultComparision:string,
		field:string
	},
	notificationSentAt:{
		type:string,
		defaultComparision:string,
		field:string
	}
}

export interface EmailMessageFields
	extends RequiredEmailFields,
		CommonMessageFields {}

export interface SMSMessageFields
	extends RequiredSMSFields,
		CommonMessageFields {}

export type LocaleType = 'en-CA' | 'fr-CA';

export enum BannerEnum {
	SDM = '11',
	LCL = '13',
}

export type MessagePayloadType = EmailMessageFields | SMSMessageFields;
export type FireStoreData = FireStoreGet | (FireStoreNotifications)[];
