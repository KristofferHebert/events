import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { createHashHistory, useBasename } from 'history'

var History = createHashHistory()

import Wrapper from './components/wrapper.jsx'
import HomePage from './pages/homepage.jsx'
import SignUpPage from './pages/signuppage.jsx'
import LoginPage from './pages/loginpage.jsx'
import UserPage from './pages/userpage.jsx'
import AddEventsPage from './pages/addeventspage.jsx'
import EventPage from './pages/eventpage.jsx'

var Routes = (
    <Route path="/" component={Wrapper}>
        <IndexRoute component={HomePage} />
        <Route path="signup" component={SignUpPage} />
        <Route path="login" component={LoginPage} />
        <Route path="u" component={UserPage} />
        <Route path="u/addevents" component={AddEventsPage} />
        <Route path="u/event/:eventId" component={EventPage} />
    </Route>
)

ReactDOM.render(<Router routes={Routes} history={History}/>, document.getElementById('app'))
