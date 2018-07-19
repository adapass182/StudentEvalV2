import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getBatches, updateBatch, updateState, resetState } from '../../actions/batches_a'
import { deleteStudent, studentActionNull } from '../../actions/students_a'
 
import { Avatar, Button, Card, Grid, Paper, Typography, CircularProgress, withStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

const styles = {
    progressGreen: {
        color: 'green',
    },
    progressYellow: {
        color: 'yellow'
    },
    progressRed: {
        color: 'red'
    },
};

class BatchView extends PureComponent {

    componentWillMount() {
        this.props.getBatches()
    }

    state = {}

    questionHat() {
        let greenArray = []
        let yellowArray = []
        let redArray = []
        let eligible = this.props.batch.students.filter(student => student.lastColor !== null)
        eligible.map((student) => {
            if (student.lastColor === 'green') return greenArray.push(student)
            if (student.lastColor === 'yellow') return yellowArray.push(student)
            if (student.lastColor === 'red') return redArray.push(student)
        })
        const r = Math.random()
        const victim = (r < 0.45) ? redArray[Math.floor(Math.random() * redArray.length)] : (r < 0.7) ? yellowArray[Math.floor(Math.random() * yellowArray.length)] : greenArray[Math.floor(Math.random() * greenArray.length)]
        console.log(`It's working! :` + victim.firstName)
        this.setState({winner: victim.firstName + ' ' + victim.lastName})
        this.props.updateState()
    }

    holder = ''

    callDelete(target) {
        this.props.deleteStudent(target.id)
    }

    callReset = () => {
        setTimeout(() => this.props.resetState(), 4000)    
    }

    render() {
    const { authenticated, batch, history } = this.props

    if (!authenticated) return (
			<Redirect to="/login" />
		)

    if (batch === null) return 'Loading...'
    if (!batch) return 'Not found'
    if (this.props.random === true) {
        this.holder = `Ask: ${this.state.winner}!`
        this.callReset()
    } else {
        this.holder = `Ask a question`
    }
    if (this.props.success === true) {
        this.props.studentActionNull()
        this.props.getBatches()
    }

    const numberOfStudents = batch.students.length
    const redStudents = batch.students.filter(student => student.lastColor === 'red').length
    const redStudentsPercentage = redStudents / numberOfStudents * 100
    const yellowStudents = batch.students.filter(student => student.lastColor === 'yellow').length
    const yellowStudentsPercentage = yellowStudents / numberOfStudents * 100
    const greenStudents = batch.students.filter(student => student.lastColor === 'green').length
    const greenStudentsPercentage = greenStudents / numberOfStudents * 100


      return (
        <Paper className="outer-paper">
            <div style={{float: "left", width: "80%", textAlign: "left"}}>
                <Button
                color="primary"
                variant="raised"
                onClick={() => history.push(`/batches`)}
                className="create-batch"
                >
                    Class list
                </Button>
                <Button
                color="primary"
                variant="raised"
                onClick={() => history.push(`/batch/${batch.id}/addstudent`)}
                >
                    Add New Student
                </Button>
                <Button
                    color="primary"
                    variant="raised"
                    onClick={() => this.questionHat()}
                    className="create-batch"
                >
                    {this.holder}
            </Button>
            </div>
            <Card raised={true}>
            <Typography variant="headline">
                Class progress:
            </Typography>
            <CircularProgress
                className={this.props.classes.progressGreen}
                size={60}
                thickness={3.6}
                value={greenStudentsPercentage}
                variant="determinate"
            >
            </CircularProgress>
            <CircularProgress
                className={this.props.classes.progressYellow}
                size={60}
                thickness={3.6}
                value={yellowStudentsPercentage}
                variant="determinate"
            >
            </CircularProgress>
            <CircularProgress
                className={this.props.classes.progressRed}
                size={60}
                thickness={3.6}
                value={redStudentsPercentage}
                variant="determinate"
            >
            </CircularProgress>
            </Card>
            <Typography variant="headline">
                Class #{batch.batchNumber}
            </Typography>
            <div>
                <Grid container alignItems="center" justify="center" spacing={40}>
                    {batch.students.map(
                        student => (
                            <Grid item xs={4}  key={student.id}>
                                <Paper className="outer-paper">
                                    <div style={{alignContent: "center", alignItems: "center", justifyContent: "center", justifyItems: "center"}}>
                                    <Avatar
                                        alt={student.firstName.slice(0,1)}
                                        src={student.avatar}
                                        style={{textAlign: "center"}}
                                        onClick={() => history.push(`/batch/${batch.id}/student/${student.id}`)}
                                    />
                                    <Typography variant="display1" gutterBottom>
                                        {student.firstName + ' ' + student.lastName}
                                    </Typography>
                                    </div>
                                    <div style={{justifyContent: "center"}}>
                                        <Button
                                            color="default"
                                            variant="fab"
                                            aria-label="delete"
                                            onClick={() => this.callDelete(student)}
                                        >
                                            <DeleteIcon/>
                                        </Button>
                                        <Button
                                            color="default"
                                            variant="fab"
                                            aria-label="delete"
                                            onClick={() => history.push(`/batch/${batch.id}/student/${student.id}/edit`)}
                                        >
                                            <EditIcon/>
                                        </Button>
                                    </div>
                                    {<h1 style={{color: student.lastColor, backgroundColor: student.lastColor}}>{student.lastColor || ''}</h1>}
                                </Paper>
                            </Grid>
                        )
                    )}
                </Grid>
            </div>
      </Paper>
    )
  }
}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentTeacher !== null,
  batch: state.batches[props.match.params.id],
  random: state.randomQuestion,
  success: state.studentAction
})

export default withStyles(styles)(connect(mapStateToProps, {getBatches, updateBatch, deleteStudent, updateState, resetState, studentActionNull})(BatchView))