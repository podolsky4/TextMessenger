import React from 'react'
import PersonAdd from '@material-ui/icons/PersonAdd'
import MailIcon from '@material-ui/icons/Mail'
import PersonIcon from '@material-ui/icons/Person'
import {withStyles} from '@material-ui/core/styles'
import classnames from 'classnames'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Card from '@material-ui/core/Card/Card'
import Avatar from '@material-ui/core/Avatar/'
import Typography from '@material-ui/core/Typography/Typography'

const styles = (theme) => ({
  media: {
    height: 140,
    background: 'cyan'
  },
  card: {
    Width: '100%'
  },
  avatar: {
    // minWidth: 75,
    // maxWidth: 100,
    position: 'relative',
    top: 24,
    height: 'auto',
    margin: '10 auto',
    border: '2px solid',
    borderColor: '#fafafa' // TODO make a themed color theme.pallete.backgound.paper
  },
  pos: {
    marginBottom: 12,
    color: 'orange',
    fontSize: 30
  },
	pos2: {
		marginBottom: 12,
		fontSize: 20
	},
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    maxWidth: 400,
    padding: 40
  },
  userInfoCnt: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
  },

  bigAvatar: {
    width: 160,
    height: 160
  }
})

class UserProfileInfoCard extends React.Component {
  render () {
    const {user, classes} = this.props
    return (
      <React.Fragment>

        <div className={classes.userInfoCnt}>
          <Avatar alt="user avatar"
                  src={ user.profilePhoto === null ?
                    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png'
                    : user.profilePhoto
                  }
                  className={classnames(classes.avatar, classes.bigAvatar)}>
            <PersonAdd/>
            {/* TODO: bug. user is not getting to here, so default icon now. */}
          </Avatar>
          <div className={classes.userInfo}>

            <Card className={classes.card}>
              <CardContent>

                <Typography className={classes.pos} color="textPrimary">
									<PersonIcon/> @{user.login}
                </Typography>
                <Typography component={'h6'} className={classes.pos2} color="textSecondary">
									<MailIcon/> {user.email}
                </Typography>

              </CardContent>
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(UserProfileInfoCard)