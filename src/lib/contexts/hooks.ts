import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '.';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;