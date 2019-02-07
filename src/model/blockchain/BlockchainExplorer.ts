import {Wallet} from "../Wallet";
import {CnTransactions} from "../Cn";

/*
export type RawDaemon_RctSignature = {
	ecdhInfo:EcdhInfo[]
	outPk:string[],
	psuedoOuts:string[],
	txnFee:number,
	type:number
}
*/

export type RawDaemon_Transaction = {
	extra : number[],
	vout : CnTransactions.Vout[],
	vin : {key:CnTransactions.Vin}[],
	rct_signatures:CnTransactions.RctSignature,
	unlock_time:number,
	version:number,
	ctsig_prunable:any,
	global_index_start?:number,
	height?:number,
	ts?:number
	hash?:string,
};

export interface BlockchainExplorer{
	getHeight() : Promise<number>;
	getScannedHeight() : number;
	watchdog(wallet : Wallet) : void;
}