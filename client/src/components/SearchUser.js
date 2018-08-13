import React, {Component} from 'react'

class SearchUser extends Component {
  onSubmit = e => {
    e.preventDefault()
  }
  render () {
    return (
      <div>
        <form onSubmit={e => this.onSubmit(e)}>
          <input type="text"/>
          <button>Find</button>
        </form>

      </div>
    )
  }
}
export default SearchUser