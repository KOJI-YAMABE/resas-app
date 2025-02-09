import { PopulationResponse, Prefecture, MunicipalityTaxesResponse } from '../types/resas'
import { apiRequest } from './apiRequest'
import { PREFECTURES_ENDPOINT, MUNICIPALITY_TAXES_ENDPOINT, POPULATION_ENDPOINT } from './endpoints'

export async function fetchPrefectures(): Promise<Prefecture[]> {
    const reponse = apiRequest<Prefecture[]>(PREFECTURES_ENDPOINT)
    return reponse
}

export async function fetchMunicipalityTaxes(prefCode: number): Promise<MunicipalityTaxesResponse[]> {
    const parameters = new URLSearchParams({
        prefCode: prefCode.toString(),
        cityCode: '-', // 全ての市町村コードを取得するためcityCode=-を指定
    })
    const response = await apiRequest<{ data: MunicipalityTaxesResponse[] }>(
        `${MUNICIPALITY_TAXES_ENDPOINT}?${parameters}`
    )
    return response.data
}

export async function fetchPopulation(prefCode: number): Promise<PopulationResponse[]> {
    const parameters = new URLSearchParams({
        prefCode: prefCode.toString(),
        cityCode: '-', // 全ての市町村コードを取得するためcityCode=-を指定
    })
    const response = await apiRequest<{ data: PopulationResponse[] }>(`${POPULATION_ENDPOINT}?${parameters}`)
    return response.data
}
