import { municipalityTaxesData, MunicipalityTaxesPerPersonResponse, PopulationResponse } from '../types/resas'

// /**
// * ⼀⼈当たり地⽅税収⼊データと⼈⼝データから、
// * 地⽅税収⼊の総額を計算して返す
// * @param taxesPerPersonData - ⼀⼈当たり地⽅税収⼊データ
// * @param populationData - ⼈⼝データ
// * @returns 地⽅税収⼊の総額データ
// */

export function processData(
    taxesPerPersonData: MunicipalityTaxesPerPersonResponse[],
    populationData: PopulationResponse[]
): municipalityTaxesData[] {
    // 人口データから年ごとの人口を取得
    const populationByYear = populationData[0].data.reduce(
        (acc: { [x: string]: any }, item: { year: string | number; value: any }) => {
            acc[item.year] = item.value
            return acc
        },
        {} as { [key: number]: number }
    )

    // 税収と人口を掛け合わせて総税収を計算
    // 人口取得APIは、５年ごとのデータしかないため、毎年の税収表記が不可
    const municipalityTaxes = taxesPerPersonData
        .map((tax) => {
            const population = populationByYear[tax.year] || 0
            return {
                year: tax.year,
                value: Math.round(tax.value * population), // 一人当たり税収（千円）　×　人口 = 総地方税収（千円）
            }
        })
        .filter((item) => item.value > 0)

    return municipalityTaxes
}
