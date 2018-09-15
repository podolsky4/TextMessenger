import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import classnames from 'classnames'
import PersonAdd from '../../../node_modules/@material-ui/icons/PersonAdd'
import Card from '../../../node_modules/@material-ui/core/Card/Card'
import CardContent from '../../../node_modules/@material-ui/core/CardContent/CardContent'
import Typography from '../../../node_modules/@material-ui/core/Typography/Typography'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from '../../../node_modules/@material-ui/icons/EditTwoTone'
import Button from '@material-ui/core/Button'

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
    color: 'orange'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: 275,
    maxWidth: 400,
    padding: 0
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
  },
  editButton: {
    // margin: theme.spacing.unit,
    background: theme.palette.primary.accentOpacity,
    alignSelf: 'flex-end',
    bottom: 14,
    // borderRadius: '50%',
    '&::hover': {
      background: theme.palette.secondary.main
    }
  }
})

class CurrentUserProfileWrapper extends React.Component {
  render () {
    const {user, classes, editableField} = this.props
    return (
      <React.Fragment>
        <div className={classes.userInfoCnt}>
          <Avatar alt="user avatar"
            // src={user.profilePhoto}
                  className={classnames(classes.avatar, classes.bigAvatar)}>
            <PersonAdd/>

            {/* TODO: bug. user is not getting to here, so default icon now. */}
          </Avatar>
          <Button className={classes.editButton}
                  onClick={editableField}
                  size="small"
                  variant="flat" aria-label="Edit"
          >
            <EditIcon />
          </Button>
          <div className={classes.userInfo}>
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.pos} color="textPrimary">
                  @{user.login}
                </Typography>
                <Typography component={'h6'} color="textSecondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default withStyles(styles)(CurrentUserProfileWrapper)