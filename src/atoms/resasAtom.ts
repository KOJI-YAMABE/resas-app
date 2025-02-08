import { atom } from 'jotai'
import { Prefecture } from '../types/resas'

export const prefecturesState = atom<Prefecture[]>([])

export const checkedCodesState = atom<number[]>([])
