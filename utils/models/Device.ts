export interface Device {
    image: string;
    title: string;
    working: boolean;
    room?: string;
}

export const getDevices = (room: string) : Device[] => {
    return (
        [
            {
                image: "https://cdn.mos.cms.futurecdn.net/ZW4ZjyfpcZgoDQnmcw6YLK.jpg",
                title: 'TV', working: true,
                room: room,
            },
            {
                image: "https://www.ikea.com/us/en/images/products/blidvaeder-table-lamp-off-white-ceramic-beige__1059592_pe849717_s5.jpg",
                title: 'Lamp', working: false,
                room: room,
            },
            {
                image: "https://www.lamps.eu/media/product/119170/354x354/wemude-ceiling-light-h3016183-0.jpg",
                title: 'Main Lights', working: false,
                room: room,
            },
            {
                image: "https://static1.pocketlintimages.com/wordpress/wp-content/uploads/wm/154419-games-review-hands-on-playstation-5-hands-on-pics-image1-tbq3hzlrkw.jpg",
                title: 'Play Station', working: true,
                room: room,
            },
            {
                image: "https://www.netrinc.com/wp-content/uploads/2023/01/Buying-a-Wall-Mounted-Air-Conditioner.jpg",
                title: 'Air cooler', working: true,
                room: room,
            },
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