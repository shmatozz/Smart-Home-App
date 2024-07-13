export interface Door {
    title: string;
    closed: boolean;
}

export const getDoors= (): Door[] => {
    return(
        [
            { title: "Main door", closed: true },
            { title: "Gate", closed: false },
            { title: "Gates", closed: true },
        ]
    )
}