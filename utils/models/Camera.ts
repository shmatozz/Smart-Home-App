import {Device} from "@/utils/models/Device";

export interface Camera extends Device {
    link: string;
}

export const getCameras = (filter: string): Camera[] => {
    return (
        [
            {
                image: "https://hobbyka.ru/upload/iblock/d25/d2526a8aecea1be55632241ee4b0e10c.jpg",
                title: "Main courtyard",
                working: true,
                link: "null",
            },
            {
                image: "https://m-strana.ru/upload/resize_cache/sprint.editor/964/830_830_1/96427c3e7182ccbce4f074754f251bb1.jpg",
                title: "Backyard",
                working: true,
                link: "null",
            },
            {
                image: "https://bigfoto.name/photo/uploads/posts/2024-02/thumbs/1709198930_bigfoto-name-p-landshaftnii-dizain-vdol-zabora-v-chastnom-82.jpg",
                title: "Behind gate",
                working: true,
                link: "null",
            },
        ]
    )
}