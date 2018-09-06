import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

export const webSocketDialog = (call) => {
  let ws = new SockJS(`http://localhost:9000/WTF?accessToken=Bearer ${localStorage.getItem('accessToken')}`)
  let stompClient = Stomp.over(ws)
  stompClient.connect({}, function (frame) {
    stompClient.subscribe('/user/queue/messages', function (resp) {
      const object = JSON.parse(resp.body)
      call(object.sender, object.receiver)
    })
  })
}