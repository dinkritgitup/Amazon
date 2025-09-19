
import { useReducer,createContext } from 'react';
import { initialState,reducer } from '../../../Utility/reducer';
export const DataContext = createContext()

export const DataProvider =({children,reducer:reducerProp,initialState:initialStateProp})=>{
    const [stateReducer, stateInitialState] = [reducerProp || reducer, initialStateProp || initialState];
    return (
      <DataContext.Provider value={useReducer(stateReducer,stateInitialState)}>{children}</DataContext.Provider>
    );
}
// const [state,dispatch]= useReducer[]