import {makeAutoObservable} from "mobx";

class StatsViewModel {
    constructor() {
        makeAutoObservable(this);
    }
}

export default StatsViewModel;