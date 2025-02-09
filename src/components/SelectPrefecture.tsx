import { useEffect } from 'react'
import { fetchPrefectures } from '../apis/resasApi'
import { prefecturesState, checkedPrefectureState } from '../atoms/resasAtom'
import { prefectureGroups } from '../constants/prefectureGroups'
import { useAtom } from 'jotai'

function SelectPrefecture() {
    const [prefectures, setPrefectures] = useAtom(prefecturesState)
    const [checkedPrefecrure, setCheckedPrefecrure] = useAtom(checkedPrefectureState)

    useEffect(() => {
        const fetchPrefectureData = async () => {
            const prefectures = await fetchPrefectures()
            setPrefectures(prefectures)
        }
        fetchPrefectureData()
    }, [setPrefectures])

    const handleCheck = (prefCode: number) => {
        const selectedPrefecture = prefectures.find((pref) => pref.prefCode === prefCode)
        setCheckedPrefecrure(selectedPrefecture)
        // チャートまでスクロール
        setTimeout(() => {
            window.scrollTo({
                top: window.innerHeight - 100,
                behavior: 'smooth',
            })
        }, 100)
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">都道府県選択</h1>
            {prefectureGroups.map((group) => {
                const regionPrefectures = prefectures.filter((pref) => group.codes.includes(pref.prefCode))
                return (
                    <div key={group.region} className="mb-4">
                        <h2 className="font-semibold mb-2">{group.region}</h2>
                        <div className="flex flex-wrap gap-3">
                            {regionPrefectures.map((pref) => {
                                const isChecked = checkedPrefecrure?.prefCode === pref.prefCode
                                return (
                                    <label key={pref.prefCode} className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="radio"
                                            name="prefecture"
                                            className="mr-1"
                                            checked={isChecked}
                                            onChange={() => handleCheck(pref.prefCode)}
                                        />
                                        {pref.prefName}
                                    </label>
                                )
                            })}
                        </div>
                        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                    </div>
                )
            })}
        </div>
    )
}

export default SelectPrefecture
