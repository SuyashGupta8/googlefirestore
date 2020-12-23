import { EventContext, PubSubMessage, QueryFieldTypes } from './type';

export const DATE_TIME_FORMAT_BASE_OPTIONS = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	timeZone: 'America/Toronto',
};

/**
 *
 * @param timeInMilliSeconds
 * @param locale
 * @param timeZone
 * @returns locale specific date string
 */
export const prettyPrintDateString = (
	timeInMilliSeconds: string,
	locale: string = 'en-CA',
	timeZone: string = 'America/Toronto'
) => {
	const parseValue = Number(timeInMilliSeconds);
	return new Date(parseValue).toLocaleString(locale, {
		...DATE_TIME_FORMAT_BASE_OPTIONS,
		timeZone,
	});
};

export const fetchPayloadFromPubSubMessage = (pubSubMessage: PubSubMessage) =>
	JSON.parse(Buffer.from(pubSubMessage?.data, 'base64').toString());

export const getAge = (timestamp: string) => Date.now() - Date.parse(timestamp);

export const isContextNotWithinRange = (
	context: EventContext,
	timeOut = Number(process.env.RETRY_TIME_OUT) || 10000
) => getAge(context?.timestamp) > timeOut;

export const queryFields:QueryFieldTypes = {
	users: {
		type:"array",
		defaultComparision:"in",
		field:"userId"
	},
	userId:{
		type:"string",
		defaultComparision:"==",
		field:"userId"
	},
	storeId:{
		type:"string",
		defaultComparision:"==",
		field:"storeId"
	},
	notificationSentAt:{
		type:"date",
		defaultComparision: ">",
		field:"notificationSentAt"
	}
}

export const FireStoreConfigs = {
	collection:"notification"
}