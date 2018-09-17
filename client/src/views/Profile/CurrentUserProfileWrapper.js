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
import {Icon} from "@material-ui/core/umd/material-ui.production.min";

const styles = (theme) => ({
  media: {
    height: 140,
    background: 'cyan'
  },
  card: {
    Width: '100%'
  },
  avatar: {
    position: 'relative',
    top: 24,
    height: 'auto',
    margin: '10 auto',
    border: '2px solid',
    borderColor: '#fafafa' // TODO make a themed color theme.pallete.backgound.paper
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.secondary.main,
    fontSize: 20
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
    background: theme.palette.primary.accentOpacity,
    alignSelf: 'flex-end',
    bottom: 14,
    '&::hover': {
      background: theme.palette.secondary.main
    }
  },
    cardLine: {
      display: 'flex',
        alignItems: 'center',
    },
    cardIcon: {
      marginRight: 4
    }

})

class CurrentUserProfileWrapper extends React.Component {
  render () {
    const {user, classes, editableField} = this.props
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
                <Typography className={classes.pos} component={'h2'} color="textPrimary">
                  @{user.login}
                </Typography>
                <Typography  component={'h6'} color="textSecondary" className={classes.cardLine}>
                    <Icon className={classes.cardIcon}>mail</Icon>{user.email}
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