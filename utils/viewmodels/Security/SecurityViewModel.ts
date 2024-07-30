import {action, makeAutoObservable, observable} from "mobx";
import {Camera, getCameras} from "@/utils/models/Camera";
import {Door, getDoors} from "@/utils/models/Door";
import translate from "@/utils/localization/Localization";

class SecurityViewModel {
    @observable public selectedCameras: string = translate("all");
    @observable public cameras: Camera[] = [];
    @observable public doors: Door[] = [];

    constructor() {
        makeAutoObservable(this);

        this.cameras = getCameras(this.selectedCameras);
        this.doors = getDoors();
    }

    @action
    public setSelectedCamera = (selectedCameras: string) => {
        this.selectedCameras = selectedCameras;
    }

    public getCamerasCount = () : number => {
        return this.cameras.length;
    }

    public getDoorsCount = () : number => {
        return this.doors.length;
    }

    public setDoorState = (index: number, value: boolean) => {
        const newStates = this.doors;
        newStates[index].closed = value;
        this.doors = newStates;
    }
}

export default SecurityViewModel;
