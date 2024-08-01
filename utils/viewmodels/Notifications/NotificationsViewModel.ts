import {observable, action, makeAutoObservable} from 'mobx'
import { Notification, getNotifications } from "@/utils/models/Notification";

class NotificationsViewModel {
    @observable public notifications: Notification[] = [];

    constructor() {
        makeAutoObservable(this);

        this.notifications = getNotifications();
    }

    @action
    public deleteNotification(index: number) {
        console.log(123)
        this.notifications.splice(index, 1);
    }
}

export default NotificationsViewModel;
