import {action, makeAutoObservable, observable} from "mobx";
import { getRooms, Room } from "@/utils/models/Room";

class AddDeviceViewModel {
    @observable rooms: Room[] = [];
    @observable deviceName: string = "";
    @observable deviceType: string = "null";
    @observable selectedRoom: number = -1;

    constructor() {
        makeAutoObservable(this);

        this.rooms = getRooms();
    }

    @action
    public setDeviceName = (name: string): void => {
        this.deviceName = name;
    }

    @action
    public setDeviceType = (type: string): void => {
        this.deviceType = type;
    }

    @action
    public setSelectedRoom = (selectedRoom: number): void => {
        this.selectedRoom = selectedRoom;
    }

    public getRoomsCount = () : number => {
        return this.rooms.length;
    }

    public startSearchingDeviceSignal = () => {
        console.log("Starting searching device signal");
    }

    public startSmartWIFIConnect = () => {
        console.log("Start SmartWIFI Connect");
    }
}

export default AddDeviceViewModel;