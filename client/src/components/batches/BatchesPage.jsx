import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getBatches } from '../../actions/batches_a'

import moment from 'moment'

import { Button, Card, CardContent, CssBaseline, Grid, Paper, Typography} from '@material-ui/core'

class BatchesPage extends PureComponent {

    componentWillMount() {
        this.props.getBatches()
    }
    
    renderBatch = (batch) => {

        const {history} = this.props

        return (
            <Grid item xs={4}>
                <Card key={batch.id} className="batch-card">
                    <CardContent>
                        <Button
                            color="primary"
                            variant="raised"
                            onClick={() => history.push(`/batch/${batch.id}`)}
                            className="view-batch"
                        >
                            Class # {batch.batchNumber}
                        </Button>
                        <Typography>
                            Students: {batch.students.length} <br />
                            Start date: {moment(batch.startDate).format("MMMM Do YYYY")} <br />
                            End date: {moment(batch.endDate).format("MMMM Do YYYY")}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }

	render() {

        const {batches, authenticated, history} = this.props
        
        if (!authenticated) return (<Redirect to='/login' />)
        if (batches === null) return <div><h3>Loading Batches...</h3></div>
        return (
            <div>
            <CssBaseline />
            <Typography variant='headline'>
                Classes:
            </Typography><br/>
			<Paper className="outer-paper">
                <Grid container spacing={40}>
                    {batches.map(batch => this.renderBatch(batch))}
                    <Button
                    color="secondary"
                    variant="raised"
                    onClick={() => history.push('/addbatch')}
                    className="new-batch"
                    >
                        Create new class
                    </Button>
                </Grid>
            </Paper>
            </div>
		)
	}
}

const mapStateToProps = state => ({
    authenticated: state.currentTeacher !== null,
    batches: state.batches === null ? null : Object.values(state.batches).sort((a, b) => a.id - b.id)
})

export default connect(mapStateToProps, {getBatches})(BatchesPage)