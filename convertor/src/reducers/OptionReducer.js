const defaultState = {
    options : []
}

export const LOAD_CURRENCIES = 'LOAD_CURRENCIES'
export const ASYNC_LOAD_CURRENCIES = 'ASYNC_LOAD_CURRENCIES'

export const OptionsReducer = (state=defaultState,action) => {
    switch(action.type){
        case LOAD_CURRENCIES:
            return {...state,options:action.payload}
        default:
            return state
    }
}

export const LOAD_CURRENCIES_ACTION = (payload) => ({type:LOAD_CURRENCIES,payload})
export const ASYNC_LOAD_CURRENCIES_ACTION = () => ({type:ASYNC_LOAD_CURRENCIES})