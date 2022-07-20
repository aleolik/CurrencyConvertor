const defaultState = {
    from_value : 0,
    from_curr : 'AED',
    to_curr : 'AED',
    to_value : 0,
    number_to_fix : 2
}

export const CHANGE_FROM_CURR = 'CHANGE_FROM_CURR'
export const CHANGE_TO_CURR = 'CHANGE_TO_CURR'
export const CHANGE_FROM_VALUE = 'CHANGE_FROM_VALUE'
export const CHANGE_TO_VALUE = 'CHANGE_TO_VALUE'
export const CHANGE_NUMBERS_TO_FIX = 'CHANGE_NUMBERS_TO_FIX'

export const ValueReducer = (state=defaultState,action) => {
    switch(action.type){
        case CHANGE_FROM_CURR:
            return {...state,from_curr:action.payload}
        case CHANGE_TO_CURR:
            return {...state,to_curr:action.payload}
        case CHANGE_TO_VALUE:
            return {...state,to_value:action.payload}
        case CHANGE_FROM_VALUE:
            return {...state,from_value:action.payload}
        case CHANGE_NUMBERS_TO_FIX:
            return {...state,number_to_fix:action.payload}
        default:
            return state
    }
}

export const CHANGE_FROM_CURR_ACTION = (payload) => ({type:CHANGE_FROM_CURR,payload})
export const CHANGE_TO_CURR_ACTION = (payload) => ({type:CHANGE_TO_CURR,payload})
export const CHANGE_TO_VALUE_ACTION = (payload) => ({type:CHANGE_TO_VALUE,payload})
export const CHANGE_FROM_VALUE_ACTION = (payload) => ({type:CHANGE_FROM_VALUE,payload})
export const CHANGE_NUMBERS_TO_FIX_ACTION = (payload) => ({type:CHANGE_NUMBERS_TO_FIX,payload})