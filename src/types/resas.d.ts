export type Prefecture = {
    prefCode: number
    prefName: string
}

export interface MunicipalityTaxesPerPersonResponse {
    year: number
    value: number
}

export type PopulationResponse = {
    data: {
        year: number
        value: number
    }[]
}

export type municipalityTaxesData = {
    year: number
    value: number
}

export type Population = {
    year: number
    value: number
}
