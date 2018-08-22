import {START_LOADER, START_RELOADED, STOP_LOADER, STOP_RELOADED} from './types'

export function toggleLoader () {
  return (dispatch) => {
    dispatch({
      type: START_LOADER,
      payload: true
    });

    setTimeout(() => {
      dispatch({
        type: STOP_LOADER,
        payload: false
      })
    }, 300)
  }
}
// export function startLoader () {
//   return (dispatch) => {
//     dispatch({
//       type: START_LOADER,
//       payload: true
//     }
//     )
//   }
// }

export function endLoader () {
  return (dispatch) => {
    dispatch({
      type: STOP_LOADER,
      payload: false
    }
    )
  }
}
export function startReLoader () {
  return (dispatch) => {
    dispatch({
      type: START_RELOADED,
      payload: true
    }
    )
  }
}

export function endReLoader () {
  return (dispatch) => {
    dispatch({
      type: STOP_RELOADED,
      payload: false
    }
    )
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
