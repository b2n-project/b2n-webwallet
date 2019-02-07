declare interface NativeQrScanner{
	scan(callback : (err : {name:string}|undefined|null,result : string) => void) : void;
	cancelScan(callback : (status : any) => void) : void;
	show() : void;
	hide() : void;
}

interface Window {
	QRScanner?:NativeQrScanner
}
