import {makeAutoObservable} from "mobx";

class ClimateViewModel {
    public RoomTitle: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    public setRoomTitle(roomTitle: string) {
        this.RoomTitle = roomTitle;
    }
}

export default ClimateViewModel;