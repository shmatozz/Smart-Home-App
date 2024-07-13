import {action, makeAutoObservable, observable} from "mobx";
import { getRooms, Room } from "@/utils/models/Room";

class AddDeviceViewModel {
    @observable rooms: Room[] = [];
    @observable deviceName: string = "";
    @observable deviceType: string = "null";
    @observable selectedRoom: number = -1;

    @observable modalVisible: boolean = false;
    @observable pressPosition = {x: 0, y: 0};

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

    @action
    public setModalVisible = (visible: boolean): void => {
        this.modalVisible = visible;
    }

    @action
    public setPressPosition = (x: number, y: number): void => {
        this.pressPosition.x = x;
        this.pressPosition.y = y;
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