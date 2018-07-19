import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { editStudent, studentActionNull } from '../../actions/students_a'
import { getBatches } from '../../actions/batches_a'

import { Button, CssBaseline, Paper, TextField } from '@material-ui/core'

const style = {
    height: 125,
    width: 750,
    margin: "5em",
    alignItems: 'center',
    textAlign: 'center',
    display: 'inline-block',
  };

class StudentView extends PureComponent {

    studentIndex = this.props.batch.students.find(student => student.id === parseInt(this.props.match.params.studentid, 0))

    toEdit = {
        firstName: this.studentIndex.firstName,
        lastName: this.studentIndex.lastName,
        avatar: this.studentIndex.avatar
    }

    state = {
        batchId: this.props.match.params.id,
        studentId: this.props.match.params.studentid,
        firstName: '',
        lastName: '',
        avatar: ''
    }

    componentWillMount() {
        this.props.getBatches()
    }

    componentDidMount() {
        this.setState({
            firstName: this.studentIndex.firstName,
            lastName: this.studentIndex.lastName,
            avatar: this.studentIndex.avatar
        })
    }

    componentDidUpdate() {
        this.props.getBatches()
    }

    componentWillUnmount() {
        this.props.studentActionNull()
        this.props.getBatches()
    }

    handleSubmit = event => {
        event.preventDefault()
        this.sendData(this.state)
    }

    sendData = (data) => {
        this.props.editStudent(data.firstName, data.lastName, data.avatar, data.batchId, data.studentId)
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
                                    label={this.toEdit.firstName}
                                    margin="normal"
                                    placeholder="First name"
                                    type="text"
                                    value={this.state.firstName || ''}
                                    onChange={this.handleChange}
                                /> <TextField
                                    id="lastName"
                                    label={this.toEdit.lastName}
                                    margin="normal"
                                    placeholder="Last name"
                                    type="text"
                                    value={this.state.lastName || ''}
                                    onChange={this.handleChange}
                                /> <TextField
                                    id="avatar"
                                    label={this.toEdit.avatar}
                                    margin="normal"
                                    placeholder="Profile image"
                                    type="text"
                                    value={this.state.avatar || ''}
                                    onChange={this.handleChange}
                                /> <br/>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="raised"
                                >
                                    Edit student
                                </Button>
                            </form>
                        </Paper>
            </div>
		)
	}
}

const mapStateToProps = (state, props) => ({
    authenticated: state.currentTeacher !== null,
    success: state.studentAction,
    batch: state.batches[props.match.params.id]
})

export default connect(mapStateToProps, {editStudent, getBatches, studentActionNull})(StudentView)