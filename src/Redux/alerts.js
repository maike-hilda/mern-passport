/* ======= Action Types =========
*
*/
export const SHOW_MSG = 'SHOW_MSG'
export const CLEAR_MSG = 'CLEAR_MSG'
export const UPDATE_MSG = 'UPDATE_MSG'
export const SET_TIME_INTERVAL = 'SET_TIME_INTERVAL'
export const CLEAR_TIME_INTERVAL = 'CLEAR_TIME_INTERVAL'

/* ======= Reducer =========
*
*/
const defaultState = {
  error: false,
  success: false,
  displayMsg: false,
  msg: '',
  timeInterval: null
}

export default function reducer(state=defaultState, action){
  switch(action.type){
    // toggles the displayMsg to show it
    case SHOW_MSG:
      return {...state, displayMsg: true}
    // Clears the message
    case CLEAR_MSG:
      return {...state, error: false, success: false, displayMsg: false, msg: ''}
    // updates msgs
    case UPDATE_MSG:
      const { msg, error, success } = action.payload
      return {...state, msg, error, success, displayMsg:true}
    // clears whatever the previous time interval was
    case CLEAR_TIME_INTERVAL:
      clearTimeout(state.timeInterval)
      return {...state, timeInterval: null }
    // sets the new time interval
    case SET_TIME_INTERVAL:
      return {...state, timeInterval: action.payload }
    default:
      return state
  }
}

/* ======= Action creators =========
*
*/

export const showMsg = () => ({ type: SHOW_MSG})
export const clearMsg = () => ({ type: CLEAR_MSG})
export const clearTimeInterval = () => ({ type: CLEAR_TIME_INTERVAL })

// Helper Function
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
export const delayedClearMsg = (ms) => (dispatch, getState) => {
  if (getState().alerts.timeInterval){
    dispatch(clearTimeInterval())
  }
  const timeInterval = setTimeout(()=>{ dispatch(clearMsg())}, ms)
  dispatch({ type: SET_TIME_INTERVAL, payload: timeInterval })
}

export const updateMsg = (msg, opts = { error: false, success:true }, msDelay) => (dispatch, getState) => {
  dispatch({ type: UPDATE_MSG, payload: { msg, error: opts.error, success: opts.success}})
  dispatch(delayedClearMsg(msDelay))
}