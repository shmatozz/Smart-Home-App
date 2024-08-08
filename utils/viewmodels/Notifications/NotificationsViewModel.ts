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
        const notificationsNew = this.notifications.slice();
        notificationsNew.splice(index, 1);
        this.notifications = notificationsNew;
    }
}

export default NotificationsViewModel;
