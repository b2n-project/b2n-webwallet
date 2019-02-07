interface StorageInterface {
	setItem(key: string, value: string): Promise<void>;
	getItem(key: string, defaultValue: any): Promise<any>;

	keys(): Promise<string[]>;
	remove(key: string): Promise<void>;
	clear(): Promise<void>;
}

class LocalStorage implements StorageInterface{
	setItem(key: string, value: string): Promise<void> {
		window.localStorage.setItem(key, value);
		return Promise.resolve();
	}

	getItem(key: string, defaultValue: any = null): Promise<string|any> {
		let value = window.localStorage.getItem(key);
		if (value === null)
			return Promise.resolve(defaultValue);
		return Promise.resolve(value);
	}

	keys(): Promise<string[]> {
		let keys: string[] = [];
		for (let i = 0; i < window.localStorage.length; ++i) {
			let k = window.localStorage.key(i);
			if (k !== null)
				keys.push(k);
		}

		return Promise.resolve(keys);
	}

	remove(key: string): Promise<void> {
		window.localStorage.removeItem(key);
		return Promise.resolve();
	}

	clear(): Promise<void> {
		window.localStorage.clear();
		return Promise.resolve();
	}
}


class NativeStorageWrap implements StorageInterface{
	setItem(key: string, value: any): Promise<void> {
		return new Promise<void>(function (resolve, reject) {
			if(window.NativeStorage)
				window.NativeStorage.setItem(key,value,function(){
					resolve();
				}, function(error : NativeNativeStorageError){
					reject();
				});
			else
				reject();
		});
	}

	getItem(key: string, defaultValue: any = null): Promise<any> {
		return new Promise<any>(function (resolve, reject) {
			if(window.NativeStorage)
				window.NativeStorage.getItem(key,function(){
					resolve();
				}, function(error : NativeNativeStorageError){
					if(error.code === 2)
						resolve(defaultValue);
					reject();
				});
			else
				reject();
		});
	}

	keys(): Promise<string[]> {
		return new Promise<string[]>(function (resolve, reject) {
			if(window.NativeStorage)
				window.NativeStorage.keys(function(keys : string[]){
					resolve(keys);
				}, function(error : NativeNativeStorageError){
					reject();
				});
			else
				reject();
		});
	}

	remove(key: string): Promise<void> {
		return new Promise<void>(function (resolve, reject) {
			if(window.NativeStorage)
				window.NativeStorage.remove(key,function(){
					resolve();
				}, function(error : NativeNativeStorageError){
					if(error.code === 2 || error.code === 3 || error.code === 4)
						resolve();
					reject();
				});
			else
				reject();
		});
	}

	clear(): Promise<void> {
		return new Promise<void>(function (resolve, reject) {
			if(window.NativeStorage)
				window.NativeStorage.clear(function(){
					resolve();
				}, function(error : NativeNativeStorageError){
					reject();
				});
			else
				reject();
		});
	}
}


export class Storage{
	static _storage : StorageInterface = new LocalStorage();

	static clear(): Promise<void> {
		return Storage._storage.clear();
	}

	static getItem(key: string, defaultValue: any = null): Promise<any> {
		return Storage._storage.getItem(key,defaultValue);
	}

	static keys(): Promise<string[]> {
		return Storage._storage.keys();
	}

	static remove(key: string): Promise<void> {
		return Storage._storage.remove(key);
	}

	static removeItem(key: string): Promise<void> {
		return Storage._storage.remove(key);
	}

	static setItem(key: string, value: any): Promise<void> {
		return Storage._storage.setItem(key,value);
	}

}

if(window.NativeStorage){
	Storage._storage = new NativeStorageWrap();
}