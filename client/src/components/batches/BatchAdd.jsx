import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createBatch, getBatches } from '../../actions/batches_a'
import { studentActionNull } from '../../actions/students_a'

import { Button, CssBaseline, Paper, TextField, Typography } from '@material-ui/core'
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

class BatchAdd extends PureComponent {

    state = {
        batchNumber: '',
        startDate: new Date(),
        endDate: new Date()
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
        this.props.createBatch(data.batchNumber, data.startDate, data.endDate)
        
    }
    
    handleChange = (event) => {
        this.setState({ batchNumber: event.target.value })
    }
    
    handleStart = (date) => {
        this.setState({startDate: date})
    }
    
    handleEnd = (date) => {
        this.setState({endDate: date})
    }


	render() {

        if (!this.props.authenticated) return (<Redirect to='/login' />)
        if (this.props.success) return (<Redirect to='/batches' />)
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div>
                    <CssBaseline />
                            <Paper className="outer-paper" style={style}>
                                <form onSubmit={this.handleSubmit}>
                                    <TextField
                                        id="batchNumber"
                                        label="Batch #"
                                        margin="normal"
                                        required={true}
                                        type="number"
                                        value={this.state.batchNumber}
                                        onChange={this.handleChange}
                                    /> <DatePicker
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.handleStart}
                                    /> <DatePicker
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.handleEnd}
                                    /> <br/>
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="raised"
                                    >
                                        Add class
                                    </Button>
                                    <Typography variant="body1">
                                    { this.props.error && <span style={{color:'red'}}>{this.props.error}</span> }
                                    </Typography>
                                </form>
                            </Paper>
                </div>
            </MuiPickersUtilsProvider>
		)
	}
}

const mapStateToProps = state => ({
    authenticated: state.currentTeacher !== null,
    success: state.studentAction,
    error: state.batches.error
})

export default connect(mapStateToProps, {createBatch, studentActionNull, getBatches})(BatchAdd)