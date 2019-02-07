import {Cn, CnUtils} from "./Cn";

export type UserKeys = {
	pub:{
		view:string,
		spend:string,
	},
	priv:{
		spend:string,
		view:string
	}
}

export class KeysRepository{

	static fromPriv(spend : string, view : string) : UserKeys{
		let pubView = CnUtils.sec_key_to_pub(view);
		let pubSpend = CnUtils.sec_key_to_pub(spend);
		return {
			pub:{
				view:pubView,
				spend:pubSpend
			},
			priv:{
				view:view,
				spend:spend,
			}
		}
	}

}