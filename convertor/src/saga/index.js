import {all} from 'redux-saga/effects'

import { optionsWatcher } from './optionsSaga'

export function* rootWatcher(){
    yield all([
        optionsWatcher(),
    ])
}