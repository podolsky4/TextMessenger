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
    }, 300)
  }
}

export function startLoader (type) {
    return (dispatch) => {
        dispatch({
            type,
            payload: true
        })

    }
}

export function stopLoader (type) {
    return (dispatch) => {
        dispatch({
            type,
            payload: false
        })

    }
}
