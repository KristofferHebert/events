import { Link, History } from 'react-router'
import Auth from '../utils/auth.jsx'

var Wrapper = React.createClass({
    mixins: [History],
    getInitialState(){
        return {
            showMenu: false,
        }
    },
    toggleMenu(event){
        event.preventDefault()
        var showMenu = !this.state.showMenu
        this.setState({showMenu: showMenu})
    },
    handleLogout(event){
        this.toggleMenu(event)
        Auth.logoutUser()
        this.history.pushState(null, '/')
    },
    isAddEventPage(){
        var hash = window.location.hash.split('/')
        return (hash.length === 4 && hash[2] === 'addevents')
    },
    goBack(){
        this.history.goBack()
    },
    render: function(){
        var isLoggedIn = Auth.isLoggedIn()
        var Home = (isLoggedIn) ? '/u' : '/'
        var showBackButton = this.isAddEventPage()

        return (
            <div>
                <div className={this.state.showMenu && isLoggedIn ? 'addSpacingForMenu' : ''}>
                    <header className={ (isLoggedIn) ? 'main bg-dark tc cf' : 'hidden'}>
                        <nav className="wrapper">
                            <ul className="list-inline">
                                <li className={ (isLoggedIn && !showBackButton) ? 'fl' : 'hidden'}><a href="#" className="menu-item">Events</a></li>
                                <li className={ (isLoggedIn && showBackButton) ? 'fl' : 'hidden'}><a href="#" className="fa fa-chevron-left menu-item" onClick={this.goBack}>Back</a></li>
                                <li className={ (isLoggedIn) ? 'fr' : 'hidden'}><a href="#" className="fa fa-bars menu-item" onClick={this.toggleMenu}>Menu</a></li>
                                <li className={ (isLoggedIn) ? 'fr tablet-desktop-only' : 'hidden'}><Link to="/u/addevents" className="fa fa-edit menu-item">Add New Event</Link></li>
                                <li className={ (isLoggedIn) ? 'fr tablet-desktop-only' : 'hidden'}><Link className="fa fa-plus-square menu-item" to="/u/">My Events</Link></li>

                            </ul>
                        </nav>
                    </header>
                    <main className="wrapper container">
                        {this.props.children}
                    </main>
                    <footer>
                        <section className="wrapper tc">
                            <p>2016 Events</p>
                        </section>
                    </footer>
                </div>
                <aside className={this.state.showMenu && isLoggedIn ? 'sidebar' : 'sidebar hidden'}>
                    <nav>
                        <h3>Menu</h3>
                        <ul className="list-nostyle">
                            <li className='mobile-only'><Link to="/u/addevents" className="fa fa-edit menu-item menu-item-vertical">Add New Event</Link></li>
                            <li className='mobile-only'><Link className="fa fa-plus-square menu-item menu-item-vertical" to="/u/">My Events</Link></li>
                          <li><a className="menu-item-vertical" onClick={this.handleLogout} >Logout</a></li>
                        </ul>
                    </nav>
                </aside>
            </div>
        )
    }
})

export default Wrapper
