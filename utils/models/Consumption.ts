import {Device} from "@/utils/models/Device";

export interface Consumption {
    unit: string,
    amount: number,
    device?: Device,
}

export const getConsumption = (period: string, devices: string) : Consumption[]  => {
    switch (period) {
        case "Day":
            return (
                [
                    { unit: '7', amount: 11, },
                    { unit: '8', amount: 9, },
                    { unit: '9', amount: 6, },
                    { unit: '10', amount: 7, },
                    { unit: '11', amount: 8, },
                    { unit: '12', amount: 5, },
                    { unit: '13', amount: 12, },
                    { unit: '14', amount: 11, },
                    { unit: '15', amount: 14, },
                    { unit: '16', amount: 4, },
                ]
            )
        case "Month":
            return (
                [
                    { unit: 'Wed', amount: 55, },
                    { unit: 'Thu', amount: 45, },
                    { unit: 'Fri', amount: 35, },
                    { unit: 'Sat', amount: 30, },
                    { unit: 'Sun', amount: 60, },
                    { unit: 'Mon', amount: 56, },
                    { unit: 'Today', amount: 30, },
                ]
            )
        case "Week":
            return (
                [
                    { unit: 'Jan', amount: 900, },
                    { unit: 'Feb', amount: 1000, },
                    { unit: 'Mar', amount: 750, },
                    { unit: 'Apr', amount: 780, },
                    { unit: 'May', amount: 660, },
                    { unit: 'Jun', amount: 700, },
                ]
            )
        default:
            return ([])
    }
}