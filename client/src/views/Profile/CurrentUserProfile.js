import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import { loadUser, loadUserFull, updateUser } from '../../actions/userActions'
import classnames from 'classnames'
import {withStyles} from '@material-ui/core/styles'
import PostList from '../../components/Post/PostList'
import Button from '@material-ui/core/Button'

import CurrentUserProfileWrapper from './CurrentUserProfileWrapper'
import ChangePassword from './ChangePassword'
import TextField from '../../../node_modules/@material-ui/core/TextField/TextField'

const styles = (theme) => ({
  ChangeUserProfileInfoCard: {
      marginTop: 80,
    MinWidth: '25%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'flex-start',
    alignContent: 'center',
    marginBottom: theme.spacing.unit * 2,
    '*': {
      borderRadius: '2px',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    '@media (max-width: 700px)': {
        justifyItems: 'flex-start',
        flexDirection: 'column'
    },

  },
  ProfileCnt: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    padding: '32px',
    background: '#009688',

  },
  UserInfoCnt: {
      marginTop: 80,
    flexShrink: 1,
    flexBasis: 1,
    flexGrow: 1,
    maxWidth: 'fit-content',
      '@media (max-width: 700px)': {
          justifySelf: 'flex-start',
          margin: 'auto',
          width: 300,
          marginTop: 22,
          flexDirection: 'column'
      },
  },
  userPostList: {
    marginTop: 80,
    flexBasis: 1,
    flexGrow: 5,
    flexShrink: 1,
    width: 500,
    maxWidth: 862,
    minWidth: 400,
    borderRadius: 6,
    padding: '1em',
    background: '#00897B',

  },
  button: {
    margin: '2px 0',
    right: -1
  },
  profileButton: {
    margin: theme.spacing.unit * 1,
    '&#save': {
      background: theme.palette.primary.accent,
      marginTop: theme.spacing.unit * 4,
      '&:hover, &:focus': {
        background: theme.palette.secondary.main,
      }
    },
    '&#cancel': {
      marginBottom: theme.spacing.unit * 1,
      '&:hover, &:focus': {
        background: theme.palette.secondary.dark
      }
    }
  },
  profilePhotoChange: {
    marginBottom: theme.spacing.unit * 2,
  },
  profilePhotoChangeSquare: {
    background: theme.palette.background.dark
  },
  passwordWrap: {
  }
})

class CurrentUserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      FirstNameerrorText: '',
      LastNameerrorText: '',
      AddresserrorText: '',
      birthdayerrorText: '',
      value: props.value,
      errorText: '',
      lastNameErrorText: '',
      login: this.props.user.login,
      email: this.props.user.email,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      address: this.props.user.address,
      profilePhoto: this.props.user.profilePhoto,
      dateBirthday: this.props.user.dateBirthday,
      viewMode: true,
      updateUserView: false
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
    const {user, updateUser} = this.props,
      {address, firstName, lastName} = this.state
    e.preventDefault()
    if ((address !== undefined && address !== user.address)
      ||(firstName!== undefined && firstName !== user.firstName)
      ||(lastName!== undefined && lastName !== user.lastName)
      ||this.refs.dateBirthday.value.length > 0
      || (this.refs.profilePhoto.files[0] !== undefined
        && this.refs.profilePhoto.files[0].name !== user.profilePhoto)    ){
      let formData = new FormData()
      formData.append('file', this.refs.profilePhoto.files[0])
      formData.append('firstName', this.state.firstName)
      formData.append('lastName', this.state.lastName)
      formData.append('address', this.state.address)
      formData.append('dateBirthday', this.refs.dateBirthday.value ? this.refs.dateBirthday.value : user.dateBirthday )
      updateUser(formData, user.login)
      this.editableField()
    }
  };
  changeNameProfilePhoto = e => {
    this.setState({profilePhoto: this.refs.profilePhoto.files[0].name})
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  changeUser = e => {
    this.setState({updateUserView:!this.state.updateUserView})
  }
  render () {
    const {user, classes, userPosts} = this.props,
     { firstName, lastName, updateUserView } = this.state
    return (
      <div className={classnames(classes.ProfileCnt, {[classes.passwordWrap]: this.state.updateUserView})} >
        {this.state.viewMode &&
          <div className={classes.UserInfoCnt}>
            <CurrentUserProfileWrapper editableField={this.editableField.bind(this)} user={user}/>
          </div>
        }
        {!this.state.viewMode &&
          <Fragment>
          <form className={classnames(classes.ChangeUserProfileInfoCard)}>
            <div className={classes.profilePhotoChange}>
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
              <div className={classes.profilePhotoChangeSquare}> Avatar image
                <label htmlFor="profilePhoto-change">
                  <Button raised='true' component="span" className={classes.button}>Upload</Button>
                </label>
              </div>
            </div>
            {<a>{this.state.profileHeader}</a>}

              <TextField id='firstName-change'
                         name='firstName'
                         type='text'
                         hinttext="Name"
                         placeholder={user.firstName}
                         label="First Name"
                         value={firstName}
                         onChange={e => this.change(e)} />
              <TextField id='lastName-change'
                         name='lastName'
                         type='text'
                         value={lastName}
                         placeholder={user.lastName}
                         label="Last Name"
                         onChange={e => this.change(e)} />
              <TextField id='address-change'
                         name='address'
                         type='text'
                         value={this.state.address}
                         label="Address"
                         onChange={e => this.change(e)} />
              <input id='dateBirth-change'
                     name='dateBirth'
                     type='date'
                     value={this.state.dateBirthday}
                     ref='dateBirthday'
                     onChange={e => this.change(e)} />
            <Button variant="contained"
                    color="primary"
                    onClick={e => this.updateUser(e)}
                    className={classes.profileButton}
                    id="save"
            >
                Save
            </Button>
            <Button variant="outlined"
                    onClick={this.editableField}
                    className={classes.profileButton}
                    id="cancel">
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={classes.profileButton}
              onClick={this.changeUser}
            >
              Change Password
            </Button>
          </form>
          </Fragment>
        }
        {!updateUserView && <PostList
          user={user}
          posts={userPosts}
          className={classes.userPostList}
        />}
        {updateUserView && <ChangePassword changeUser = {this.changeUser.bind(this)}/>}
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