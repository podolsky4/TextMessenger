import React, {Component} from 'react'
import {connect} from 'react-redux'
import { loadUser, loadUserFull, updateUser } from '../../actions/userActions'
import classnames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import PostList from '../../components/Post/PostList'
import Button from '@material-ui/core/Button'

import CurrentUserProfileWrapper from './CurrentUserProfileWrapper'
import ChangePassword from './ChangePassword'
import InputAdornment from '../../../node_modules/@material-ui/core/InputAdornment/InputAdornment'

const styles = (theme) => ({
  ChangeUserProfileInfoCard: {
    Width: '25%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'space-between',
    alignContent: 'center',
    '*': {
      borderRadius: '2px',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  },
  ProfileCnt: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    padding: '32px',
    background: '#009688'
  },
  UserInfoCnt: {
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
    maxWidth: 'fit-content'
  },
  userPostList: {
    flexBasis: 1,
    flexGrow: 5,
    flexShrink: 1,
    width: 500,
    maxWidth: 862,
    minWidth: 400,
    borderRadius: 6,
    padding: '1em',
    background: '#00897B'
  },
  button: {
    margin: '2px 0',
    right: -1
  },
  profileButton: {
    background: theme.palette.primary.accent
  }
})

class CurrentUserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: this.props.user.login,
      email: this.props.user.email,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      address: this.props.user.address,
      profilePhoto: this.props.user.profilePhoto,
      dateBirthday: this.props.user.dateBirthday,
      viewMode: true
    }
  }
  componentWillMount(){
    const {loadProfileUser} = this.props
    loadProfileUser()
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  editableField = () => {
    this.setState({
      viewMode: !this.state.viewMode
    })
  };
  updateUser = e => {
    const {user, updateUser} = this.props
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', this.refs.profilePhoto.files[0])
    formData.append('firstName', this.state.firstName)
    formData.append('lastName', this.state.lastName)
    formData.append('address', this.state.address)
    formData.append('dateBirthday', this.state.dateBirthday)
    updateUser(formData, user.login)
    this.editableField()
  };
  changeNameProfilePhoto = e => {
    this.setState({profilePhoto: this.refs.profilePhoto.files[0].name})
  }
  render () {
    const {user, classes, userPosts} = this.props

    return (
      <div className={classes.ProfileCnt}>
        {this.state.viewMode &&
          <div className={classes.UserInfoCnt}>
            <CurrentUserProfileWrapper editableField={this.editableField.bind(this)} user={user}/>
          </div>
        }
        {!this.state.viewMode &&
          <form className={classnames(classes.ChangeUserProfileInfoCard)}>
            <InputAdornment position="end">
              <input
                accept="image/*"
                className={classes.input}
                type="file"
                name="profilePhoto-change"
                id="profilePhoto-change"
                ref="profilePhoto"
                onChange={e => this.changeNameProfilePhoto(e)}
                style={{display: 'none'}}
              />
              <label> Avatar image
                <label htmlFor="profilePhoto-change">
                  <Button raised='true' component="span" className={classes.button}>Upload</Button>
                </label>
              </label>
            </InputAdornment>
            <label>
              name:
              <input id='firstName-change' name='firstName' type='text' placeholder={this.props.user.firstName} value={this.state.firstName}
                onChange={e => this.change(e)} />
            </label>
            <label>
              surname:
              <input id='lastName-change' name='lastName' type='text' placeholder={this.props.user.lastName} value={this.state.lastName}
                onChange={e => this.change(e)} />
            </label>
            <label>
              address:
              <input id='address-change' name='address' type='text' placeholder={this.props.user.address} value={this.state.address}
                onChange={e => this.change(e)} />
            </label>
            <label>
              birthday:
              <input id='dateBirth-change' name='dateBirth' type='date' value={this.state.dateBirthday}
                onChange={e => this.change(e)} />
            </label>
            <Button variant="contained"
                    color="primary"
                    onClick={e => this.updateUser(e)}
                    className={classes.profileButton}
            >
            Apply
          </Button>
            <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.editableField}
            >
              Cancel
            </Button>
              <ChangePassword />
          </form>
        }

        <PostList
          user={user}
          posts={userPosts}
          className={classes.userPostList}
        />

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    id: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: (login) => dispatch(loadUser(login)),
    loadProfileUser: () => dispatch(loadUserFull()),
    updateUser: (data, login) => dispatch(updateUser(data, login))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CurrentUserProfile))