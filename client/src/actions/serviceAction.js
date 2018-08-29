class FetchData {
  constructor () {
    this.defaultParams = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }

  /**
   * Generic API used by custom methods
   */

  get (url) {
    return this.makeRequest(url)
  }

  post (url, body) {
    let res = JSON.stringify(body)
    return this.makeRequest(url, 'POST', res)
  }

  put (url, body) {
    let res = JSON.stringify(body)
    return this.makeRequest(url, 'PUT', res)
  }

  deleteApi (url) {
    return this.makeRequest(url, 'DELETE')
  }

  makeRequest (url, method = 'GET', body) {
    const requestParams = {
      ...this.defaultParams,
      method: method,
      body: body
    }

    return this.sendRequest(url, requestParams)
  }

  sendRequest (url, requestParams) {
    return new Promise((resolve, reject) => {
      fetch(url, requestParams)
        .then(result => this.handleErrors(result, reject))
        .then(result => resolve(result))
        .catch(reason => {
          this.requestFailed(reason)
          reject(reason)
        })
    })
  }

  handleErrors (result, reject) {
    if (result.status === 401) {
      window.location.reload()
    } else if (!result.ok) {
      result.json()
        .then(result => {
          this.requestFailed(result)
          reject(result)
        })
    } else {
      return result
    }
  }

  requestFailed (reason) {
    if (reason.message === 'Failed to fetch') {
      console.log('Error', 'Network request has failed')
    } else if (reason.error) {
      console.log(reason.error, reason.message)
    } else {
      console.log('Error', 'An error has occurred')
    }
  }
}
export default new FetchData()