import {createStore,combineReducers,applyMiddleware} from 'redux'

import { ValueReducer } from '../reducers/ValueReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import { rootWatcher } from '../saga'
import { OptionsReducer } from '../reducers/OptionReducer'
const sagaMidldeware = createSagaMiddleware()

const rootReducer = combineReducers({
    value:ValueReducer,
    currencies:OptionsReducer,
})

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(sagaMidldeware)))

sagaMidldeware.run(rootWatcher)