declare enum NativeNativeStorageErrorCode{
	NATIVE_WRITE_FAILED = 1,
	ITEM_NOT_FOUND = 2,
	NULL_REFERENCE = 3,
	UNDEFINED_TYPE = 4,
	JSON_ERROR = 5,
	WRONG_PARAMETER = 6
}

type NativeNativeStorageError = {
	code:number,
	exception?:any,
	source?:"Native"|"JS"
}

declare interface NativeNativeStorage {
	setItem(key : string,value : any,callbackSuccess : ()=>void,callbackError : (error : NativeNativeStorageError)=>void) : void;
	getItem(key : string,callbackSuccess : ()=>void,callbackError : (error : NativeNativeStorageError)=>void) : void;
	keys(callbackSuccess : (keys : string[])=>void,callbackError : (error : NativeNativeStorageError)=>void) : void;
	remove(key : string,callbackSuccess : ()=>void,callbackError : (error : NativeNativeStorageError)=>void) : void;
	clear(callbackSuccess : ()=>void,callbackError : (error : NativeNativeStorageError)=>void) : void;
}

interface Window {
	NativeStorage?:NativeNativeStorage
}
