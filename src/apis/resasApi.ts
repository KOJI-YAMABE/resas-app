import { PopulationResponse, Prefecture } from '../types/resas'
import { apiRequest } from './apiRequest'
import { PREFECTURES_ENDPOINT, POPULATION_ENDPOINT } from './endpoints'

export async function fetchPrefectures(): Promise<Prefecture[]> {
    return apiRequest<Prefecture[]>(PREFECTURES_ENDPOINT)
}

export async function fetchPopulation(prefCode: number): Promise<PopulationResponse[]> {
    const result = await apiRequest<{ data: PopulationResponse[] }>(
        `${POPULATION_ENDPOINT}?prefCode=${prefCode}`
    )
    return result.data
}
