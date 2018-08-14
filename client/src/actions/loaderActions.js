import {
  START_LOADER,
  STOP_LOADER
} from './types'

export function toggleLoader () {
  return (dispatch) => {
    dispatch({
      type: START_LOADER,
      payload: true
    })

    setTimeout(() => {
      dispatch({
        type: STOP_LOADER,
        payload: false
      })
    }, 3000)
  }
}