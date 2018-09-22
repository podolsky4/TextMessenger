import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

export const webSocketDialog = (callback) => {
  let ws = new SockJS(`http://localhost:9000/front?accessToken=Bearer ${localStorage.getItem('accessToken')}`)
  let stompClient = Stomp.over(ws)
  stompClient.connect({}, frame => {
    stompClient.subscribe('/user/queue/messages', resp => {
      const message = JSON.parse(resp.body)
      callback && callback(message)
    })
  })
}