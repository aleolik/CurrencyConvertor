
import './App.css';
import {useDispatch,useSelector} from 'react-redux'
import {CHANGE_TO_CURR_ACTION,CHANGE_FROM_CURR_ACTION,CHANGE_TO_VALUE_ACTION,CHANGE_FROM_VALUE_ACTION, CHANGE_FROM_CURR, CHANGE_NUMBERS_TO_FIX_ACTION} from './reducers/ValueReducer'
import {ASYNC_LOAD_CURRENCIES_ACTION} from './reducers/OptionReducer'
import {React,useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import {ImArrowDown,ImArrowUp} from 'react-icons/im'
function App() {
  // redux vars
  const dispatch = useDispatch()
  const from_value = useSelector(state => state.value.from_value)
  const to_value = useSelector(state => state.value.to_value)
  const from_curr = useSelector(state => state.value.from_curr)
  const to_curr = useSelector(state => state.value.to_curr)
  const options = useSelector(state => state.currencies.options)
  const number_to_fix = useSelector(state => state.value.number_to_fix)


  //Refs
  const FromInputRef = useRef()
  const ToInputRef = useRef()


  // to fix (values)
  const [toFixValues,setToFixValues] = useState([
    2,4,6,8,10,12
  ])


  // functions
  const changeNumberToFix = (num) => {
    dispatch(CHANGE_NUMBERS_TO_FIX_ACTION(num))
  }
  const changeFromValue = (e) => {
    const value = e.target.value
    dispatch(CHANGE_FROM_VALUE_ACTION(value))
  }
  const changeToValue = (e) => {
    const value = e.target.value
    dispatch(CHANGE_TO_VALUE_ACTION(value))
  }

  const changeToCurr = (curr) => {
    dispatch(CHANGE_TO_CURR_ACTION(curr))
  }
  const changeFromCurr = (curr) => {
    dispatch(CHANGE_FROM_CURR_ACTION(curr))
  }


  //TODO: округление - возможность выбрать,fix redux saga infinity loop

  // load Currencies Api
  useEffect(() => {
    dispatch(ASYNC_LOAD_CURRENCIES_ACTION())
  },[])

  //swap 
  const swapCurrencies = () => {
    const from_select = document.getElementById('from_select')
    const to_select = document.getElementById('to_select')
    const PrevFromCurr = from_curr
    dispatch(CHANGE_FROM_CURR_ACTION(to_curr))
    dispatch(CHANGE_TO_CURR_ACTION(PrevFromCurr))
    to_select.value = to_curr
    from_select.value = from_curr


  }


  //Logic of convertor
  const CHANGE_FROM_INPUT = (e) => {
    changeFromValue(e)
  }
  useEffect(() => {
    if (options.rates){
      // получает flaot значения по монете
      const from_curr_value = options.rates[from_curr]
      const to_curr_value = options.rates[to_curr]
      dispatch(CHANGE_TO_VALUE_ACTION((from_value * from_curr_value / to_curr_value).toFixed(number_to_fix)))
    }
  },[from_curr,from_value,to_curr,number_to_fix])

  useEffect(() => {
    ToInputRef.current.value = to_value
    FromInputRef.current.value = from_value
  },[to_value,from_value])



  return (
    <div className="app">
      <div className='center'>
        
        <h6>Кол-во чисел после точки:</h6>
        <select onChange={(e) => changeNumberToFix(e.target.value)} style={{'width':200+'px'}} className="form-select form-select-lg mb-6" aria-label=".form-select-lg example">
          {toFixValues.map((value) => {
            return(
              <option key={value} className='btn btn-primary' value={value}>{value}</option>
            )
          })}
        </select>
        <h6>Dynamic Currency Convertor</h6>
        <input id='from_input' ref={FromInputRef} onChange={(e) => changeFromValue(e)} className='input_elem' placeholder={from_value}></input>
        <select id='from_select' onChange={(e) => changeFromCurr(e.target.value)} style={{'width':200+'px'}} className="form-select form-select-lg mb-6" aria-label=".form-select-lg example">
          {options.rates && (
          Object.entries(options.rates).map(([curr,value,index]) => {            
               return(
                  <option key={index} className='btn btn-primary' value={curr}>{curr}</option>
               )
            })
          )}
        </select>
        <div className='center-div'>
        <button onClick={() => swapCurrencies()} className='btn btn-dark'>Swap Currencies</button>
        </div>
        <input  id='to_input' disabled  ref={ToInputRef} className='input_elem' onChange={(e) => changeToValue(e)} placeholder={to_value}></input>
        <select id='to_select'  onChange={(e) => changeToCurr(e.target.value)} style={{'width':200+'px'}} className="form-select form-select-lg mb-6" aria-label=".form-select-lg example">
        {options.rates && (
          Object.entries(options.rates).map(([curr,value,index]) => {
               return(
                <option key={index} className=' btn btn-primary' value={curr}>{curr}</option>
               )
            })
          )}
        </select>
      </div>
    </div>
  );
}

export default App;
