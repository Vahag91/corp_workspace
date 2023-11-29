import {useDispatch} from 'react-redux'
import {AppDispatch} from 'entities/redux/store/store'

export const useAppDispatch: ()=> AppDispatch = useDispatch