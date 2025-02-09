import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { checkedPrefectureState } from '../atoms/resasAtom'
import { fetchMunicipalityTaxes } from '../apis/resasApi'
import { MunicipalityTaxesResponse } from '../types/resas'

function MunicipalityTaxesLineChart() {
    const [checkedPrefecture] = useAtom(checkedPrefectureState)
    const [taxData, setTaxData] = useState<MunicipalityTaxesResponse[]>([])

    useEffect(() => {
        const fetchMunicipalityTaxesData = async () => {
            if (!checkedPrefecture) return
            const municipalityTaxes = await fetchMunicipalityTaxes(checkedPrefecture.prefCode)
            setTaxData(municipalityTaxes)
        }
        fetchMunicipalityTaxesData()
    }, [checkedPrefecture])

    if (!checkedPrefecture) {
        return <div className="text-gray-500">都道府県を選択してください</div>
    }

    return (
        <div className="h-[500px]">
            <div className="w-full h-[400px]">
                <h2 className="text-xl font-bold mb-4">{`${checkedPrefecture.prefName}：1人当たりの地方税推移`}</h2>
                <p className="text-gray-600 text-sm mb-1">地方税(千円)/人</p>
                <ResponsiveContainer>
                    <LineChart data={taxData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" dy={8} label={{ value: '年', position: 'insideBottomRight', dy: 25 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" name="地方税" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MunicipalityTaxesLineChart
