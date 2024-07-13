import { makeAutoObservable, action, observable, reaction } from "mobx";
import { setItem } from "@/utils/storage/AsyncStorage";
import { getOnboardings, Onboardings } from "@/utils/models/Onboardings";

class OnboardingViewModel {
    @observable step  = 1;
    @observable watched = false;

    private onboardings: Onboardings[] = getOnboardings();

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => [this.watched],
            () => {
                this.OnboardingFinished();
            }
        );
    }

    @action
    public incStep = () : void => {
        this.step = Math.min(this.step + 1, 3);
    }

    @action
    public setWatched = (val: boolean) : void => {
        this.watched = val;
    }

    private OnboardingFinished = () => {
        setItem("firstLaunch", false).then();
    }

    public getTitle = () : string => {
        return this.onboardings[this.step - 1].title;
    }

    public getDescription = () : string => {
        return this.onboardings[this.step - 1].description;
    }
}

export default OnboardingViewModel;