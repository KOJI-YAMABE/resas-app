import { atom } from 'jotai'
import { Prefecture } from '../types/resas'
import { fetchPrefectures } from '../apis/resasApi'

export const prefecturesState = atom(async () => {
    const prefectures = await fetchPrefectures()
    return prefectures
})

export const checkedPrefectureState = atom<Prefecture>()
