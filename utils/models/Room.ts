export interface Room {
    image: string;
    title: string;
    devices: number;
}

export const getRooms = () : Room[] => {
    return (
        [
            {
                image: "https://www.mebelkaliningrada.ru/wp-content/uploads/2018/12/2750880675.jpg",
                title: 'Living room',
                devices: 6
            },
            {
                image: "https://colodu.club/uploads/posts/2022-10/1666684356_21-colodu-club-p-master-spalnya-planirovka-krasivo-21.jpg",
                title: 'Bedroom',
                devices: 7
            },
            {
                image: "https://www.service-general.gr/media/widgetkit/kitchen5-c512f9d4d63cc58aa6469df0fd830991.jpg",
                title: 'Kitchen',
                devices: 9
            },
            {
                image: "https://gagaru.club/uploads/posts/2023-02/thumbs/1676687091_gagaru-club-p-krasivaya-prikhozhaya-v-dome-vkontakte-8.jpg",
                title: 'Hallway',
                devices: 3
            },
        ]
    )
}