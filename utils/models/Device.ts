export interface Device {
    image: string;
    title: string;
    working: boolean;
    room: string | undefined;
}

export const getDevices = (room: string) : Device[] => {
    return (
        [
            {
                image: "https://cdn.mos.cms.futurecdn.net/ZW4ZjyfpcZgoDQnmcw6YLK.jpg",
                title: 'TV', working: true,
                room: room,
            }
        ]
    )
}

export const getRecentDevices = () : Device[] => {
    return (
        [
            {
                image: "https://cdn.mos.cms.futurecdn.net/ZW4ZjyfpcZgoDQnmcw6YLK.jpg",
                title: 'TV', working: true,
                room: 'Living Room',
            },
            {
                image: "https://www.ikea.com/us/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059592_pe849717_s5.jpg",
                title: 'Lamp', working: false,
                room: 'Bedroom',
            },
            {
                image: "https://www.netrinc.com/wp-content/uploads/2023/01/Buying-a-Wall-Mounted-Air-Conditioner.jpg",
                title: 'Air cooler', working: true,
                room: 'Kitchen',
            }
        ]
    )
}