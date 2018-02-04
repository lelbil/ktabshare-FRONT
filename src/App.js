import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Add } from 'material-ui-icons'
import AddOne from './Components/content/AddOne'
import Register from './Components/content/Register'

import Content from './Components/content'

//Inline styles
const styles = {
    toolbar: {
        backgroundColor: "rgba(70, 153, 135, 0.7)",
        borderBottom: "solid 2px",
    },
    usernameInput: {
        height:"30px",
        marginRight: "10px",
    },
    passwordInput: {
        height:"30px",
    },
}

class App extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            addBook: false,
            register: false,
            registerAnchor: null,
            logged: false,
            reservations: true,
            username: "",
            password: "",
        }
    }

    componentWillMount() {
        this.changeLoggedState()
    }

    addABook = () => {
        this.setState({
            addBook: true,
        })
    }

    closeAddOneDialog = () => {
        this.setState({
            addBook: false,
        })
    }

    signup = (event) => {
        this.setState({
            register: true,
            registerAnchor: event.target,
        })
    }

    changeLoggedState = () => {
        this.setState({
            logged: this.props.cookies.get('logged') || false,
        })
    }

    onRegister = () => {
        this.props.cookies.set('logged', true)
        this.changeLoggedState()
    }

    login = () => {
        const { username, password } = this.state

        fetch('http://localhost:3005/users/login', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
            .then(response => {
                if (response.status !== 200) {
                    alert('login failed') //TODO: more user friendly please!!
                } else {
                    this.props.cookies.set('logged', true)
                    this.changeLoggedState()
                }
            })
            .catch(error => console.error('Unexpected error when login: ', error))
    }

    logout = () => {
        fetch('http://localhost:3005/users/logout', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error('Something went wrong when logging out, time to debug!')
                } else {
                    this.props.cookies.remove('logged')
                    this.changeLoggedState()
                }
            })
            .catch(error => console.error('Unexpected error when login: ', error))

    }

    closeRegisterPopover = () => {
        this.setState({
            register: false,
        })
    }

    change = e => {
        const {name, value} = e.target
        const newStateObject = {}
        newStateObject[name] = value
        this.setState(newStateObject)
    }

    seeReservations = () => {
        this.setState({ reservations: !this.state.reservations })
    }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <AddOne isOpen={this.state.addBook} close={this.closeAddOneDialog} />
            <Register isOpen={this.state.register} onRegister={this.onRegister} close={this.closeRegisterPopover} anchorEl={this.state.registerAnchor} />
            <div id={"boxesContainer"}>
                <div id={"box1"} className={"box"}>
                    <Toolbar style={styles.toolbar} id={"toolbar"}>
                        <ToolbarGroup id={"toolbarGroup"}>
                            <div id={"toolbarTitle"}>
                                <ToolbarTitle text="KtabShare"/>
                                <ToolbarSeparator/>
                            </div>
                            { this.state.logged && <RaisedButton onClick={this.addABook} style={{ marginLeft: "auto",}} primary={true}>&nbsp;Add A Book <Add style={{margin: "auto"}} /></RaisedButton>}
                            <div id={"toolbarControls"}>
                                {!this.state.logged ?
                                    <React.Fragment>
                                        <section id={"login"} className={"login"}>
                                            <form action={""} className="login">
                                                <input name="username" value={this.state.username} onChange={this.change} type={"text"} placeholder={"Username"} style={styles.usernameInput}/>
                                                <input name="password" value={this.state.password} onChange={this.change} type={"password"} placeholder={"Password"} style={styles.passwordInput}/>
                                                <RaisedButton onClick={this.login} primary={true}>Login</RaisedButton>
                                            </form>
                                        </section>
                                        <ToolbarSeparator/>
                                        <RaisedButton id = {"registerButton"} onClick={this.signup} primary={true}>Register</RaisedButton>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <RaisedButton onClick={this.seeReservations} primary={true}>See {this.state.reservations? "My Reservations": "All books"}</RaisedButton>
                                        <ToolbarSeparator/>
                                        <RaisedButton onClick={this.logout} primary={true}>Logout</RaisedButton>
                                    </React.Fragment>
                                }
                            </div>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <Content reservations={this.state.reservations}/>
            </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withCookies(App);
