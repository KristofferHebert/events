import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import { createHashHistory, useBasename } from 'history'

var History = createHashHistory()

import Wrapper from './components/wrapper.jsx'
import HomePage from './pages/homepage.jsx'
import SignUpPage from './pages/signuppage.jsx'
import LoginPage from './pages/loginpage.jsx'
import UserPage from './pages/userpage.jsx'


var Routes = (
    <Route path="/" component={Wrapper}>
      <IndexRoute component={HomePage} />
        <Route path="signup" component={SignUpPage} />
        <Route path="login" component={LoginPage} />
            <Route path="u" component={UserPage}>
                
            </Route>

    </Route>
)

ReactDOM.render(<Router routes={Routes} history={History}/>, document.getElementById('app'))
