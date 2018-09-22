import React from 'react'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
// -------------------------------------

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '60%',
    marginTop: theme.spacing.unit * 1,
    background: 'rgba(0, 0, 0, 0.4)',
    color: 'white'
  },
  heading: {
    color: 'rgba(255, 255, 255, 0.92)'
  },
  cont: {
    background: 'red',
    color: 'inherit'
  },
  cardText: {
    marginTop: '1em',
    color: 'rgba(255, 255, 255, 0.76)'
  },
  hr: {
    border: '#ffffff1f 1px dotted',
    borderRadius: '2px',
    boxShadow: '0px 2px 2px 0px #ed485638',
    marginTop: '16px',
    marginBottom: '16px',
    width: '107%',
    left: '-3.5%',
    position: 'relative'
  }

})

const TextCard = (props) => {
  const {classes, text} = props
  return (
    <Paper className={classes.root} elevation={1}>
      <Typography className={classes.heading} variant="headline" component="h3">
        {text}
      </Typography>
      <hr className={classes.hr}/>
      <Typography className={classes.cardText} component="div">
        <b>Contributors</b>
        <ul>
          <li>Andrew Koziulia - <em>mentor</em></li>
          <li>Igor Fandorin</li>
          <li>Illya Fefelov <em>full.iron</em></li>
          <li>Igor Rudenko</li>
          <li>Kostyantyn Matlayev</li>
          <li>Yuri Podolsky</li>
        </ul>
      </Typography>
    </Paper>

  )
}

// TextCard.propTypes = {
//     classes: PropTypes.object.isRequired,
//     text: PropTypes.string,
// };

export default withStyles(styles)(TextCard)