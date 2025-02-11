export type Prefecture = {
    prefCode: number
    prefName: string
}

export interface MunicipalityTaxesPerPersonResponse {
    year: number
    value: number
}

export type PopulationResponse = {
    year: number
    value: number
}

export type municipalityTaxesData = {
    year: number
    value: number
}
