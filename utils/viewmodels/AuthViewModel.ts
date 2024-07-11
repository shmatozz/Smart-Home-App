import { makeAutoObservable, action, observable } from "mobx";

class AuthViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    @observable public login = '';
    @observable public password = '';

    @observable public filled = false;

    @action
    public setLogin = (val: string) : void => {
        this.login = val;
    }

    @action
    public setPassword = (val: string) : void => {
        this.password = val;
    }

    @action
    public setFilled = (val: boolean) : void => {
        this.filled = val;
    }
}

export default AuthViewModel;