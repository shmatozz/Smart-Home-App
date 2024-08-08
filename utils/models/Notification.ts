export interface Notification {
    type: "WARNING" | "ERROR" | "INFO";
    text: string;
}

export function getNotifications(): Notification[] {
    return [
        {
            type: 'INFO', text: 'Your tea is ready.'
        },
        {
            type: 'WARNING', text: 'Electricity usage is to large!'
        },
        {
            type: 'ERROR', text: 'Fridge is not responding!'
        },
    ]
}
