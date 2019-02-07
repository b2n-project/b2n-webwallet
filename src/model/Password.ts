export class Password{

	static checkPasswordConstraints(password : string, raiseError : boolean = true){
		let anUpperCase = /[A-Z]/;
		let aLowerCase = /[a-z]/;
		let aNumber = /[0-9]/;
		let aSpecial = /[!|@|'|"|#|$|%|^|&|*|(|)|-|_]/;

		let numUpper = 0;
		let numLower = 0;
		let numNums = 0;
		let numSpecials = 0;
		for(let i=0; i<password.length; i++){
			if(anUpperCase.test(password[i]))
				numUpper++;
			else if(aLowerCase.test(password[i]))
				numLower++;
			else if(aNumber.test(password[i]))
				numNums++;
			else if(aSpecial.test(password[i]))
				numSpecials++;
		}

		if(password.length < 8 || numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1){
			if(raiseError){
				swal({
					type: 'error',
					title: i18n.t('global.passwordNotComplexEnoughModal.title'),
					text: i18n.t('global.passwordInvalidRequirements'),
					confirmButtonText:i18n.t('global.passwordNotComplexEnoughModal.confirmText'),
				});
			}

			return false;
		}

		return true;
	}

}