import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createStudent, studentActionNull, deleteStudent } from '../../actions/students_a'
import { getBatches } from '../../actions/batches_a'

import { Avatar, Button, Card, CardContent, CssBaseline, Grid, Typography } from '@material-ui/core'

class StudentPage extends PureComponent {

    studentIndex = this.props.batch.students.find(student => student.id === parseInt(this.props.match.params.studentid, 0))

    state = {
        batchId: this.props.match.params.id,
        studentId: this.props.match.params.studentid
    }

    componentWillMount() {
        this.props.getBatches()
    }    

    componentWillUnmount() {
        this.props.studentActionNull()
    }

	render() {

        if (!this.props.authenticated) return (<Redirect to='/login' />)
        if (this.props.success === true) return (<Redirect to={`/batch/${this.props.match.params.id}`} />)

        return (
            <div>
                <CssBaseline />
                    <Grid container style={{justifyContent: "center"}} >
                        <Grid item xs={4}>
                            <Card key={this.props.match.params.id} >
                                <Avatar
                                    alt={this.studentIndex.firstName.slice(0,1)}
                                    src={this.studentIndex.avatar}
                                />
                                <CardContent>
                                    <Typography variant="headline">
                                        {this.studentIndex.firstName + ' ' + this.studentIndex.lastName}
                                    </Typography>
                                    <Typography>
                                        Class: {this.props.match.params.id} <br />
                                        Latest evaluation: {this.studentIndex.lastColor} <br />
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Button
                                color="secondary"
                                variant="raised"
                                onClick={() => this.props.history.push(`/batch/${this.props.batch.id}/student/${this.studentIndex.id}/evaluate`)}
                            >
                                Evaluate
                            </Button>
                            <Button
                                color="secondary"
                                variant="raised"
                                onClick={() => this.props.history.push(`/batch/${this.props.batch.id}/student/${this.studentIndex.id}/edit`)}
                            >
                                Edit
                            </Button>
                            <Button
                                color="secondary"
                                variant="raised"
                                onClick={() => this.props.deleteStudent(this.studentIndex.id)}
                            >
                                Delete
                            </Button>
                            <Card>
                            {this.studentIndex.evaluations.map(
                                evaluation => (
                                        <Card>                                    
                                            <div style={{alignContent: "center", alignItems: "center", justifyContent: "center", justifyItems: "center"}}>
                                            <Typography variant="display1">
                                                Evaluation number: {evaluation.id}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                Date: {evaluation.date}<br/>
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                Comment: {evaluation.comment}<br/>
                                            </Typography>
                                            <Typography variant="body1" gutterBottom>
                                                Color: {evaluation.color}<br/>
                                            </Typography>
                                            </div>
                                        </Card>
                                )
                            )}
                            </Card>
                        </Grid>
                    </Grid>
            </div>
		)
	}
}

const mapStateToProps = (state, props) => ({
    authenticated: state.currentTeacher !== null,
    success: state.studentAction,
    batch: state.batches[props.match.params.id]
})

export default connect(mapStateToProps, {createStudent, deleteStudent, studentActionNull, getBatches})(StudentPage)