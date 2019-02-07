import {Storage} from "./Storage";

export class Translations{

	static getBrowserLang() : string{
		let browserUserLang = ''+(navigator.language || (<any>navigator).userLanguage);
		browserUserLang = browserUserLang.toLowerCase().split('-')[0];
		return browserUserLang;
	}

	static getLang() : Promise<string>{
		return Storage.getItem('user-lang', Translations.getBrowserLang());
	}

	static setBrowserLang(lang : string){
		Storage.setItem('user-lang', lang);
	}

	static storedTranslations : any = {};

	static loadLangTranslation(lang : string) : Promise<void>{
		console.log('setting lang to '+lang);
		let promise : Promise<{messages?: any, date?: string, number?: string }>;
		if(typeof Translations.storedTranslations[lang] !== 'undefined')
			promise = Promise.resolve(Translations.storedTranslations[lang]);
		else
			promise = new Promise<{messages?: any, date?: string, number?: string }>(function (resolve, reject) {
				$.ajax({
					url: './translations/' + lang + '.json'
				}).then(function (data: any) {
					if(typeof data === 'string')data = JSON.parse(data);
					Translations.storedTranslations[lang] = data;
					resolve(data);
				}).fail(function () {
					reject();
				});
			});

		promise.then(function(data: { website?:any,messages?: any, date?: string, number?: string }){
			if (typeof data.date !== 'undefined')
				i18n.setDateTimeFormat(lang, data.date);
			if (typeof data.number !== 'undefined')
				i18n.setNumberFormat(lang, data.number);
			if (typeof data.messages !== 'undefined')
				i18n.setLocaleMessage(lang, data.messages);

			i18n.locale = lang;

			$('title').html(data.website.title);
			$('meta[property="og:title"]').attr('content',data.website.title);
			$('meta[property="twitter:title"]').attr('content',data.website.title);

			$('meta[name="description"]').attr('content',data.website.description);
			$('meta[property="og:description"]').attr('content',data.website.description);
			$('meta[property="twitter:description"]').attr('content',data.website.description);


			let htmlDocument = document.querySelector('html');
			if (htmlDocument !== null)
				htmlDocument.setAttribute('lang', lang);
		});

		return (<any>promise);
	}

}