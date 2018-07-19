import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createStudent, studentActionNull } from '../../actions/students_a'

import { Button, CssBaseline, Paper, TextField } from '@material-ui/core'

const style = {
    height: 125,
    width: 750,
    margin: "5em",
    alignItems: 'center',
    textAlign: 'center',
    display: 'inline-block',
  };

class StudentAdd extends PureComponent {

    state = {
        batchId: this.props.match.params.id
    }

    componentWillUnmount() {
        this.props.studentActionNull()
    }

    handleSubmit = event => {
        event.preventDefault()
        this.sendData(this.state)
    }

    sendData = (data) => {
        console.log(`match params:` + this.props.match.params.id)
        console.log(`hi Adam! ` + data)
        this.props.createStudent(data.firstName, data.lastName, data.avatar, data.batchId)
        
    }
    
    handleChange = (event) => {
        const { id, value } = event.target
        this.setState({ [id]: value })
    }
    
	render() {

        if (!this.props.authenticated) return (<Redirect to='/login' />)
        if (this.props.success === true) return (<Redirect to={`/batch/${this.props.match.params.id}`} />)

        return (
            <div>
                <CssBaseline />
                        <Paper className="outer-paper" style={style}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    id="firstName"
                                    label="First name"
                                    margin="normal"
                                    required={true}
                                    type="text"
                                    value={this.state.firstName || ''}
                                    onChange={this.handleChange}
                                /> <TextField
                                    id="lastName"
                                    label="Last name"
                                    margin="normal"
                                    required={true}
                                    type="text"
                                    value={this.state.lastName || ''}
                                    onChange={this.handleChange}
                                /> <TextField
                                    id="avatar"
                                    label="Profile image"
                                    margin="normal"
                                    required={true}
                                    type="text"
                                    value={this.state.avatar || ''}
                                    onChange={this.handleChange}
                                /> <br/>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="raised"
                                >
                                    Add student
                                </Button>
                            </form>
                        </Paper>
            </div>
		)
	}
}

const mapStateToProps = state => ({
    authenticated: state.currentTeacher !== null,
    success: state.studentAction
})

export default connect(mapStateToProps, {createStudent, studentActionNull})(StudentAdd)