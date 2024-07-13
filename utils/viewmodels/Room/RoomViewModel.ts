import {action, makeAutoObservable, observable, reaction} from "mobx";
import {Device, getDevices} from "@/utils/models/Device";

class RoomViewModel {
    @observable title = '';
    @observable devices: Device[] = [];

    constructor() {
        makeAutoObservable(this)

        reaction(
            () => this.title,
            (room) => {
                this.setDevices(room);
            }
        )
    }

    @action
    public setRoomTitle(title: string) {
        this.title = title;
    }

    @action
    public setDevices(room: string) {
        this.devices = getDevices(room);
    }

    @action
    public setDeviceWorking(index: number, working: boolean) {
        this.devices[index].working = working;
    }
}

export default RoomViewModel;