let global : any = typeof window !== 'undefined' ? window : self;
global.config = {
	apiUrl:typeof window !== 'undefined' && window.location ? window.location.href.substr(0,window.location.href.lastIndexOf('/')+1)+'api/' : 'https://wallet.bitcoin2.network/api/',
	mainnetExplorerUrl: "http://explorer.bitcoin2.network/",
    mainnetExplorerUrlHash: "http://explorer.bitcoin2.network/transaction.html?hash={ID}",
    mainnetExplorerUrlBlock: "http://explorer.bitcoin2.network/block.html?hash={ID}",
    testnetExplorerUrl: "http://testnet.bitcoin2.network/",
    testnetExplorerUrlHash: "http://testnet.bitcoin2.network/transaction.html?hash={ID}",
    testnetExplorerUrlBlock: "http://testnet.bitcoin2.network/block.html?hash={ID}",
	testnet: false,
	coinUnitPlaces: 12,
	txMinConfirms: 10,         // corresponds to CRYPTONOTE_DEFAULT_TX_SPENDABLE_AGE in Monero
	txCoinbaseMinConfirms: 60, // corresponds to CRYPTONOTE_MINED_MONEY_UNLOCK_WINDOW in Monero
	addressPrefix: 2345936,
	integratedAddressPrefix: 2345936,
	addressPrefixTestnet: 2345936,
	integratedAddressPrefixTestnet: 2345936,
	subAddressPrefix: 2345936,
	subAddressPrefixTestnet: 2345936,
	feePerKB: new JSBigInt('1000000'),//20^10 - for testnet its not used, as fee is dynamic.
	dustThreshold: new JSBigInt('1000000'),//10^10 used for choosing outputs/change - we decompose all the way down if the receiver wants now regardless of threshold
	defaultMixin: 0, // default value mixin

	idleTimeout: 30,
	idleWarningDuration: 20,

	coinSymbol: 'B2N',
	openAliasPrefix: "b2n",
	coinName: 'bitcoin2network',
	coinUriPrefix: 'b2n:',
	avgBlockTime: 90,
	maxBlockNumber: 500000000,

	donationAddresses : [
		'btc2fcfkwRUSjfmFijYYzVXD3UUAcLs9ZBNmgXRqcQECgMpvJQ4n9JY3g2h1UNQGbUbKpPQXKMPie3aPi24kvkvS58LiAKaArda'
	]
};