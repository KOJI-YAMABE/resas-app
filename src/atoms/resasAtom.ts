import { atom } from 'jotai'
import { Prefecture } from '../types/resas'
import { fetchPrefectures } from '../apis/resasApi'

const baseAtom = atom<Prefecture[]>([])
export const prefecturesState = atom(
    async () => {
        const prefectures = await fetchPrefectures()
        return prefectures
    },
    (_get, _set, data: Prefecture[]) => {
        _set(baseAtom, data)
    }
)

export const checkedPrefectureState = atom<Prefecture | undefined>(undefined)
