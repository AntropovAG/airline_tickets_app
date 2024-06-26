import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../src/redux/store.ts'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()