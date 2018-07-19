import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {Provider} from 'react-redux'
import store from './store'

import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'

ReactDOM.render(
	<Provider store={store}>
		<MuiPickersUtilsProvider utils={MomentUtils}>
		<App />
		</MuiPickersUtilsProvider>
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()