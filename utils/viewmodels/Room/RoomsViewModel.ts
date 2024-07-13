import {makeAutoObservable, observable} from "mobx";
import {getRooms, Room} from "@/utils/models/Room";

class RoomsViewModel {
    @observable public rooms: Room[] = [];

    constructor() {
        makeAutoObservable(this);

        this.rooms = getRooms();
    }

    public getRoomsCount = () : number => {
        return this.rooms.length;
    }
}

export default RoomsViewModel;