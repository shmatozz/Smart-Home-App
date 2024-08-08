import {observable, action, makeAutoObservable} from 'mobx'
import {Room, getRooms} from "@/utils/models/Room";
import {Device, getRecentDevices} from "@/utils/models/Device";

class HomeViewModel {
    @observable public rooms: Room[] = [];
    @observable public recentDevices: Device[] = [];
    @observable public notificationVisible: boolean = false;

    constructor() {
        makeAutoObservable(this);

        this.rooms = getRooms();
        this.recentDevices = getRecentDevices();
    }

    public getRoomsCount = () : number => {
        return this.rooms.length;
    }

    @action
    public setDeviceWorking = (index: number, working: boolean) => {
        this.recentDevices[index].working = working;
    }

    @action
    public setNotificationVisible = (visible: boolean) => {
        this.notificationVisible = visible;
    }
}

export default HomeViewModel;
