import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { Button } from 'react-bootstrap'

class BackButton extends Component {
  static contextTypes = {
    router: () => true, // replace with PropTypes.object if you use them
  }

  render() {
    return (
      <Button 
        variant='link'
        onClick={this.context.router.history.goBack}>
          <img src={require("./back_button_icon.png")} height='10' width='10' ></img>
      </Button>
    )
  }
}

export default withRouter(BackButton)