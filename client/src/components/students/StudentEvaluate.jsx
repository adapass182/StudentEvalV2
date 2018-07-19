import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { submitEvaluation, studentActionNull } from '../../actions/students_a'
import { getBatches } from '../../actions/batches_a'
import { teacherInfo } from '../../jwt'

import { Button, CssBaseline, Paper, Select, TextField, Typography } from '@material-ui/core'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import DatePicker from 'material-ui-pickers/DatePicker';

const style = {
    height: 125,
    width: 750,
    margin: "5em",
    alignItems: 'center',
    textAlign: 'center',
    display: 'inline-block',
  };

class StudentEvaluate extends PureComponent {

    studentIndex = this.props.batch.students.find(student => student.id === parseInt(this.props.match.params.studentid, 0))
    teacherIndex = teacherInfo(this.props.currentTeacher.jwt)

    state = {
        studentId: this.props.match.params.studentid,
        teacherId: this.teacherIndex.id,
        color: '',
        comment: '',
        date: new Date()
    }

    componentWillMount() {
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
        this.props.submitEvaluation(data.color, data.comment, data.date, data.studentId, data.teacherId)
    }
    
    handleChange = (event) => {
        const { id, value } = event.target
        this.setState({ [id]: value })
    }

    handleDate = (date) => {
        this.setState({date: date})
    }


	render() {

        if (!this.props.authenticated) return (<Redirect to='/login' />)
        if (this.props.success === true) return (<Redirect to={`/batch/${this.props.match.params.id}/student/${this.props.match.params.studentid}`} />)

        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div>
                    <CssBaseline />
                        <Typography variant="headline">
                            {this.studentIndex.firstName + ' ' + this.studentIndex.lastName}
                        </Typography>
                        <Paper className="outer-paper" style={style}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    id="color"
                                    label="color"
                                    margin="normal"
                                    type="color"
                                    value={this.state.color || 'blue'}
                                    onChange={this.handleChange}
                                /> <TextField
                                    id="comment"
                                    label="comment"
                                    margin="normal"
                                    multiline={true}
                                    type="text"
                                    value={this.state.comment || ''}
                                    onChange={this.handleChange}
                                /> <DatePicker
                                    name="startDate"
                                    value={this.state.date}
                                    onChange={this.handleDate}
                                />  <br/>
                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="raised"
                                >
                                    Submit evaluation
                                </Button>
                            </form>
                        </Paper>
                </div>
            </MuiPickersUtilsProvider>
		)
	}
}

const mapStateToProps = (state, props) => ({
    authenticated: state.currentTeacher !== null,
    success: state.studentAction,
    batch: state.batches[props.match.params.id],
    currentTeacher: state.currentTeacher
})

export default connect(mapStateToProps, {submitEvaluation, getBatches, teacherInfo, studentActionNull})(StudentEvaluate)