import { makeAutoObservable, action, observable, reaction } from "mobx";
import { setItem } from "@/utils/storage/AsyncStorage";

class AuthViewModel {
    @observable public login = '';
    @observable public password = '';

    @observable public filled = false;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => [this.login, this.password],
            ([login, password]) => {
                this.setFilled(login.length > 0 && password.length > 0);
            }
        );
    }

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

    @action
    public LogIn = () => {
        this.login = '';
        this.password = '';
        this.filled = false;

        setItem("logged", true).then();
    }
}

export default AuthViewModel;
