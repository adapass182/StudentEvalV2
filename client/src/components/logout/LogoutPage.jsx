import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {logout} from '../../actions/teachers_a'
import {Redirect} from 'react-router-dom'

class LogoutPage extends PureComponent {
	
	componentWillMount() {
		this.props.logout()
	}

	render() {

		if (this.props.authenticated === false) return (
			<Redirect to="/login" />
		)

		return (
			<div>
				<h1>Logging out...</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	authenticated: state.currentTeacher !== null
})

export default connect(mapStateToProps, {logout})(LogoutPage)
