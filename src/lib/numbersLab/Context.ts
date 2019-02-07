export class Context{
    public static getGlobalContext():any{
        return window;
    }

    public static getGlobalContextStorage() : any{
        return Context.getGlobalContext()['data'];
    }
}

Context.getGlobalContext()['data'] = {};
