import {action, makeAutoObservable, observable, reaction} from "mobx";
import {Consumption, getConsumption} from "@/utils/models/Consumption";
import translate from "@/utils/localization/Localization";

class GraphViewModel {
    @observable public period: string = translate("day");
    @observable public devicesCategory: string = translate("all");
    @observable public consumptionData: Consumption[] = [];
    @observable public selected: number | null = null;

    @observable public min: number = Number.MAX_VALUE;
    @observable public max: number = 0;

    constructor() {
        makeAutoObservable(this);

        this.consumptionData = getConsumption(this.period, this.devicesCategory);
        this.setMin(Math.min(...this.consumptionData.map(item => item.amount)))
        this.setMax(Math.max(...this.consumptionData.map(item => item.amount)))

        reaction(
            () => [this.period, this.devicesCategory],
            ([period, deviceCategory]) => {
                this.consumptionData = getConsumption(period, deviceCategory);
                this.setSelected(null);
            }
        )

        reaction(
            () => this.consumptionData,
            (data) => {
                this.setMin(Math.min(...data.map(item => item.amount)))
                this.setMax(Math.max(...data.map(item => item.amount)))
                console.log(this.min, this.max)
            }
        )
    }

    @action
    public setPeriod = (period: string) => {
        this.period = period;
    }

    @action
    public setDevicesCategory = (category: string) => {
        this.devicesCategory = category;
    }

    @action
    public setSelected = (selected: number | null) => {
        this.selected = selected;
    }

    @action
    public setMin = (min: number) => {
        this.min = min;
    }

    @action
    public setMax = (max: number) => {
        this.max = max;
    }
}

export default GraphViewModel;
