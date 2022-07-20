import {put,takeEvery,call} from 'redux-saga/effects'

import { LOAD_CURRENCIES_ACTION,ASYNC_LOAD_CURRENCIES_ACTION } from '../reducers/OptionReducer'
const fetchOptions = () => {
    return(
        fetch('https://cdn.cur.su/api/latest.json')
    )
}
function* fetchOptionsWorker(){
    const data = yield call(fetchOptions)
    const json = yield call(() => new Promise(res => res(data.json())))
    yield put(LOAD_CURRENCIES_ACTION(json))

}

export function* optionsWatcher(){
    yield takeEvery ('ASYNC_LOAD_CURRENCIES',fetchOptionsWorker)
}
