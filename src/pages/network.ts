import {DestructableView} from "../lib/numbersLab/DestructableView";
import {VueVar} from "../lib/numbersLab/VueAnnotate";
import {TransactionsExplorer} from "../model/TransactionsExplorer";
import {WalletRepository} from "../model/WalletRepository";
import {BlockchainExplorerRpc2} from "../model/blockchain/BlockchainExplorerRpc2";
import {DependencyInjectorInstance} from "../lib/numbersLab/DependencyInjector";
import {Constants} from "../model/Constants";
import {Wallet} from "../model/Wallet";
import {AppState} from "../model/AppState";

AppState.enableLeftMenu();

class NetworkView extends DestructableView{
	@VueVar(0) networkHashrate !: number;
	@VueVar(0) blockchainHeight !: number;
	@VueVar(0) networkDifficulty !: number;
	@VueVar(0) lastReward !: number;
	@VueVar(0) lastBlockFound !: number;

	private intervalRefreshStat = 0;

	constructor(container : string){
		super(container);

		let self = this;
		this.intervalRefreshStat = setInterval(function(){
			self.refreshStats();
		}, 30*1000);
		this.refreshStats();
	}

	destruct(): Promise<void> {
		clearInterval(this.intervalRefreshStat);
		return super.destruct();
	}

	refreshStats() {
		let self = this;
		$.ajax({
			url:config.apiUrl+'network.php'
		}).done(function(data : any){
			self.networkDifficulty = data.difficulty;
			self.networkHashrate = data.difficulty/config.avgBlockTime/1000000;
			self.blockchainHeight = data.height;
			self.lastReward = data.reward/Math.pow(10, config.coinUnitPlaces);
			self.lastBlockFound = parseInt(data.timestamp);
		});
	}

}

new NetworkView('#app');