export type Prefecture = {
    prefCode: number
    prefName: string
}

export interface MunicipalityTaxesResponse {
    year: number
    value: number
}

export type PopulationResponse = {
    boundaryYear: string
    data: {
        year: number
        value: number
    }[]
}
