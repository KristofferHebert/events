import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { createHashHistory, useBasename } from 'history'

var History = createHashHistory()

import Wrapper from './components/wrapper.jsx'
import HomePage from './pages/homepage.jsx'

var Routes = (
    <Route path="/" component={Wrapper}>
      <IndexRoute component={HomePage} />
    </Route>
)

ReactDOM.render(<Router routes={Routes} history={History}/>, document.getElementById('app'))
