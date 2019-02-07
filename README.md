# Official bitcoin2network Web Wallet - Fully client-side 
This web wallet is forked from Masari project and is doing everything client-side to give the best privacy to users.
The server is currently only used to optimize the communication with the daemon and compress the blockchain.  

Note: This requirement may be removed in the future once daemons evolve and return enough data.  

# Security
**No keys, seeds, or sensitive data is sent to the server**  
If you find a potential security issue, please contact me so we/I can patch it as soon as possible.  
Encryption is done with a certified library, [Tweetnacl.Js.](https://github.com/dchest/tweetnacl-js)

# Contributors and thanks
Developers:
- gnock (main)
- cryptochangements
- codingronin

Translations:
- English: too many people
- French: gnock
- Serbian cyrillic: girugameshh
- German: F0sching
- Hungarian: Gelesztaa
- Greek: GeraltOfTrivia

# Contributing
- You can help bitcoin2network by translation the wallet in your native language, it's really easy!  
Read [the translations guide](TRANSLATIONS.md) to get instructions on how to do that
- Report bugs & ideas to help us improve the web wallet by opening an issue 
- [Make a donation to bitcoin2network](https://www.wallet.bitcoin2.network/#!donate)


# Features (non-exhaustive)
- Complete wallet sync without server side processing for security
- Receive/send history
- Mempool support to check incoming transfers
- Send coins - including QR code scanning and subaddress support
- Receive page to generate a custom QR code
- Import from private keys, mnemonic seed, or json file (exported by the wallet)
- Export private keys, mnemonic phrase, or json file (which include all the history)
- View only wallet
- Basic network stats

# Roadmap
See Github [issues.](https://github.com/b2n-project/b2n-webwallet/issues)
