import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { checkedPrefectureState } from '../atoms/resasAtom'
import { fetchMunicipalityTaxesPerPerson, fetchPopulation } from '../apis/resasApi'
import { YEN_CONVERSION_FACTOR } from '../constants/units'
import { processData } from '../utils/dataProcessing'
import { municipalityTaxesData } from '../types/resas'

function MunicipalityTaxesLineChart() {
    const [checkedPrefecture] = useAtom(checkedPrefectureState)
    const [municipalityTaxesData, setMunicipalityTaxesData] = useState<municipalityTaxesData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            if (!checkedPrefecture) return
            const [taxesPerPersonData, populationData] = await Promise.all([
                fetchMunicipalityTaxesPerPerson(checkedPrefecture.prefCode),
                fetchPopulation(checkedPrefecture.prefCode),
            ])

            const municipalityTaxes = processData(taxesPerPersonData, populationData)
            setMunicipalityTaxesData(municipalityTaxes)
        }
        fetchData()
    }, [checkedPrefecture])

    if (!checkedPrefecture) {
        return <div className="text-gray-500">都道府県を選択してください</div>
    }

    return (
        <div className="h-[500px]">
            <div className="w-full h-[400px]">
                <h2 className="text-xl font-bold mb-4">{`${checkedPrefecture.prefName}：地方税収入の推移`}</h2>
                <p className="text-gray-600 text-sm mb-1">地方税収入</p>
                <ResponsiveContainer>
                    <LineChart data={municipalityTaxesData} margin={{ top: 10, right: 30, left: 30, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="year"
                            dy={8}
                            label={{ value: '年度', position: 'insideBottomRight', dy: 25 }}
                            tickFormatter={(value) => `${value}年`}
                        />
                        <YAxis tickFormatter={(value) => `${(value / YEN_CONVERSION_FACTOR).toFixed(0)}億`} />
                        <Tooltip
                            formatter={(value: number) => [
                                `${(value / YEN_CONVERSION_FACTOR).toFixed(1)}億円`,
                                '地方税収入',
                            ]}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="地方税収入" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MunicipalityTaxesLineChart
