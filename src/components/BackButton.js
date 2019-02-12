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
      <button
        className="button icon-left"
        onClick={this.context.router.history.goBack}>
          Back
      </button>
    )
  }
}
export default withRouter(BackButton)