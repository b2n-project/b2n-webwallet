//https://github.com/chariotsolutions/phonegap-nfc/blob/master/www/phonegap-nfc.js

type NativeNfcEventNdef = {
	id:number[],
	tnf:number,
	type:number[],
	payload:number[]
}

declare enum NativeNfcTechType{
	AndroidNfcA="android.nfc.tech.NfcA",
	AndroidMifawareUltralight="android.nfc.tech.MifawareUltralight",
	AndroidNdef="android.nfc.tech.Ndef",
}

type NativeNfcEvent = {
	tag:{
		id:number[],
		techTypes:NativeNfcTechType[],
		maxSize:number,
		isWritable:boolean,
		canMakeReadOnly:boolean,
		ndefMessage?:NativeNfcEventNdef[]
	},
}

type NfcStatus = any;

declare interface NativeNfc{
	NO_NFC : NfcStatus;
	NFC_DISABLED : NfcStatus;
	NO_NFC_OR_NFC_DISABLED : NfcStatus;

	addNdefListener(onDetect : (event : NativeNfcEvent) => void, onCallbackAdded : (params : any) => void, onError : (error : any) => void) : void;
	removeNdefListener(onDetect : (event : NativeNfcEvent) => void, onCallbackAdded : (params : any) => void, onError : (error : any) => void) : void;
	showSettings(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	close(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	showSettings(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	beginSession(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	invalidateSession(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	erase(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	share(ndefMessage : NativeNfcEventNdef[],onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	write(ndefMessage : NativeNfcEventNdef[],onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	unshare(onSuccess : (params : any) => void, onError : (error : any) => void) : void;
	transceive(data : ArrayBuffer|string) : Promise<ArrayBuffer>;

	enabled(onNfcEnable : () => void, onNfcDisabled : (error : any) => void) : void;
}

declare interface NativeNdef{
	TNF_EMPTY : number;
	TNF_WELL_KNOWN : number;//0x01
	TNF_MIME_MEDIA : number;//0x02
	TNF_ABSOLUTE_URI : number;//0x03
	TNF_EXTERNAL_TYPE : number;//0x04
	TNF_UNKNOWN : number;//0x05
	TNF_UNCHANGED : number;//0x06
	TNF_RESERVED : number;//0x07

	record(tnf:number,type:number[],id:number[],payload:number[]) : NativeNfcEventNdef;
	textRecord(text : string, languageCode ?: string, id ?: number[]) : NativeNfcEventNdef;
	uriRecord(text : string, id ?: number[]) : NativeNfcEventNdef;
	emptyRecord() : NativeNfcEventNdef;
}

declare interface NativeUtil{
	toHex(i : number) : string;
	toPrintable(i : number) : string;
	bytesToString(bytes : number[]) : string;
	bytesToHexString(bytes : number[]) : string;
	stringToBytes(str : string) : number[];
	arrayBufferToHexString(buffer : ArrayBuffer) : string;
	hexStringToArrayBuffer(hex : string) : ArrayBuffer;
}

interface Window {
	nfc?:NativeNfc,
	ndef?:NativeNdef,
	util?:NativeUtil
}
