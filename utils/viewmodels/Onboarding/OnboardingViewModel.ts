import { makeAutoObservable, action, observable, reaction } from "mobx";
import { setItem } from "@/utils/storage/AsyncStorage";
import translate from "@/utils/localization/Localization";

class OnboardingViewModel {
    @observable step  = 1;
    @observable watched = false;

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
        return translate("onboarding-title-" + (this.step).toString());
    }

    public getDescription = () : string => {
        return translate("onboarding-text-" + (this.step).toString());
    }
}

export default OnboardingViewModel;
