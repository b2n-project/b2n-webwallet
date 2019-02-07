import {DestructableView} from "../lib/numbersLab/DestructableView";
import {VueVar, VueWatched} from "../lib/numbersLab/VueAnnotate";
import {TransactionsExplorer} from "../model/TransactionsExplorer";
import {WalletRepository} from "../model/WalletRepository";
import {BlockchainExplorerRpc2, WalletWatchdog} from "../model/blockchain/BlockchainExplorerRpc2";
import {DependencyInjectorInstance} from "../lib/numbersLab/DependencyInjector";
import {Constants} from "../model/Constants";
import {Wallet} from "../model/Wallet";
import {AppState} from "../model/AppState";
import {Storage} from "../model/Storage";
import {Translations} from "../model/Translations";
import {BlockchainExplorerProvider} from "../providers/BlockchainExplorerProvider";

let wallet : Wallet = DependencyInjectorInstance().getInstance(Wallet.name, 'default', false);
let blockchainExplorer : BlockchainExplorerRpc2 = BlockchainExplorerProvider.getInstance();
let walletWatchdog : WalletWatchdog = DependencyInjectorInstance().getInstance(WalletWatchdog.name,'default', false);

class SendView extends DestructableView{
	@VueVar(10) readSpeed !: number;
	@VueVar(false) checkMinerTx !: boolean;

	@VueVar(0) creationHeight !: number;
	@VueVar(0) scanHeight !: number;

	@VueVar(-1) maxHeight !: number;
	@VueVar('en') language !: string;

	@VueVar(0) nativeVersionCode !: number;
	@VueVar('') nativeVersionNumber !: string;

	constructor(container : string){
		super(container);
		let self = this;
		this.readSpeed = wallet.options.readSpeed;
		this.checkMinerTx = wallet.options.checkMinerTx;

		this.creationHeight = wallet.creationHeight;
		this.scanHeight = wallet.lastHeight;

		blockchainExplorer.getHeight().then(function (height: number) {
			self.maxHeight = height;
		});

		Translations.getLang().then((userLang : string) => {
			this.language = userLang;
		});

		if(typeof (<any>window).cordova !== 'undefined' && typeof (<any>window).cordova.getAppVersion !== 'undefined') {
			(<any>window).cordova.getAppVersion.getVersionNumber().then((version : string) => {
				this.nativeVersionNumber = version;
			});
			(<any>window).cordova.getAppVersion.getVersionCode().then((version : number) => {
				this.nativeVersionCode = version;
			});
		}
	}

	@VueWatched()
	languageWatch() {
		Translations.setBrowserLang(this.language);
		Translations.loadLangTranslation(this.language);
	}

	deleteWallet() {
		swal({
			title: i18n.t('settingsPage.deleteWalletModal.title'),
			html: i18n.t('settingsPage.deleteWalletModal.content'),
			showCancelButton: true,
			confirmButtonText: i18n.t('global.openWalletModal.confirmText'),
			cancelButtonText: i18n.t('global.openWalletModal.cancelText'),
		}).then((result:any) => {
			if (result.value) {
				AppState.disconnect();
				DependencyInjectorInstance().register(Wallet.name, undefined,'default');
				WalletRepository.deleteLocalCopy();
				window.location.href = '#index';
			}
		});
	}

	@VueWatched()	readSpeedWatch(){this.updateWalletOptions();}
	@VueWatched()	checkMinerTxWatch(){this.updateWalletOptions();}
	@VueWatched()	creationHeightWatch(){
		if(this.creationHeight < 0)this.creationHeight = 0;
		if(this.creationHeight > this.maxHeight && this.maxHeight !== -1)this.creationHeight = this.maxHeight;
	}
	@VueWatched()	scanHeightWatch(){
		if(this.scanHeight < 0)this.scanHeight = 0;
		if(this.scanHeight > this.maxHeight && this.maxHeight !== -1)this.scanHeight = this.maxHeight;
	}

	private updateWalletOptions(){
		let options = wallet.options;
		options.readSpeed = this.readSpeed;
		options.checkMinerTx = this.checkMinerTx;
		wallet.options = options;
		walletWatchdog.signalWalletUpdate();
	}

	updateWalletSettings(){
		wallet.creationHeight = this.creationHeight;
		wallet.lastHeight = this.scanHeight;
		walletWatchdog.signalWalletUpdate();
	}


}


if(wallet !== null && blockchainExplorer !== null)
	new SendView('#app');
else
	window.location.href = '#index';
