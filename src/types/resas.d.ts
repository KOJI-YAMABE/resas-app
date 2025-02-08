export type Prefecture = {
    prefCode: number
    prefName: string
}

export type PopulationResponse = {
    label: string
    data: {
        year: number
        value: number
    }[]
}
