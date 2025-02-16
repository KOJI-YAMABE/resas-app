import { useEffect, useState } from 'react'
import { fetchMunicipalityTaxesPerPerson, fetchPopulation } from '../apis/resasApi'
import { processData } from '../utils/dataProcessing'
import { municipalityTaxesData } from '../types/resas'

export const useMunicipalityTaxes = (prefCode: number | undefined) => {
    const [municipalityTaxesData, setMunicipalityTaxesData] = useState<municipalityTaxesData[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            if (!prefCode) return
            setIsLoading(true)
            const [taxesPerPersonData, populationData] = await Promise.all([
                fetchMunicipalityTaxesPerPerson(prefCode),
                fetchPopulation(prefCode),
            ])

            const municipalityTaxes = processData(taxesPerPersonData, populationData)
            setMunicipalityTaxesData(municipalityTaxes)
            setIsLoading(false)
        }
        fetchData()
    }, [prefCode])

    return { municipalityTaxesData, isLoading }
}
