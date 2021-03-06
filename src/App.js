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
        marginRight: "5px",
    },
    registerButton: {
        alignSelf: 'center',
    },
}

const api_uri = process.env.REACT_APP_API_URI || "http://localhost:3005"

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
            reservations: false,
            myBooks: false,
            username: "",
            password: "",
            bookToEdit: null,
            loginError: false,
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
            bookToEdit: null,
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

        fetch(api_uri + '/users/login', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
            .then(async response => {
                if (response.status !== 200) {
                    const result = await response.json()
                    console.log('RESULT', result)
                    if (result.name === 'FAILED LOGIN') {
                        document.getElementById('loginUser').style.boxShadow = '0 0 1px 1px red'
                        document.getElementById('loginPassword').style.boxShadow = '0 0 1px 1px red'
                        this.setState({
                            password: '',
                            loginError: true,
                        })
                    }
                    else console.log('LOGIN FAILED, UNKNOWN ERROR', result)
                } else {
                    this.props.cookies.set('logged', true)
                    this.changeLoggedState()
                }
            })
            .catch(error => console.error('Unexpected error when login: ', error))
    }

    logout = () => {
        fetch( api_uri + '/users/logout', {
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
        this.setState({
            reservations: !this.state.reservations,
            myBooks: false,
        })
    }

    handleKeyPress = event => {
        if(event.key === 'Enter'){
            this.login()
        }
    }

    myBooks = () => {
        this.setState({ myBooks: !this.state.myBooks })
    }

    editABook = book => {
        this.setState({ bookToEdit: book, addBook: true })
    }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <AddOne isOpen={this.state.addBook} close={this.closeAddOneDialog} book={this.state.bookToEdit}/>
            <Register isOpen={this.state.register} onRegister={this.onRegister} close={this.closeRegisterPopover} anchorEl={this.state.registerAnchor} />
            <div id={"boxesContainer"}>
                <div id={"box1"} className={"box"}>
                    <Toolbar style={styles.toolbar} id={"toolbar"}>
                        <ToolbarGroup id={"toolbarGroup"}>
                            <div id={"toolbarTitle"}>
                                <ToolbarTitle text="BookDealer"/>
                                <ToolbarSeparator/>
                            </div>
                            { this.state.logged && <RaisedButton onClick={this.addABook} style={{ marginLeft: "auto",}} primary={true}>&nbsp;Add A Book <Add style={{margin: "auto"}} /></RaisedButton>}
                            <div id={"toolbarControls"}>
                                {!this.state.logged ?
                                    <React.Fragment>
                                        <div>
                                        <section id={"login"} className={"login"}>
                                            <form action={""} className="login">
                                                <input id='loginUser' onKeyPress={this.handleKeyPress} name="username" value={this.state.username} onChange={this.change} type={"text"} placeholder={"Username"} style={styles.usernameInput}/>
                                                <input id='loginPassword' onKeyPress={this.handleKeyPress} name="password" value={this.state.password} onChange={this.change} type={"password"} placeholder={"Password"} style={styles.passwordInput}/>
                                                <RaisedButton onClick={this.login} primary={true}>Login</RaisedButton>
                                            </form>
                                        </section>
                                            { this.state.loginError && <h5 style={{margin: 1, color: 'red'}}>Wrong username/password</h5> }
                                        </div>
                                        <ToolbarSeparator/>
                                        <RaisedButton style={ styles.registerButton } id = {"registerButton"} onClick={this.signup} primary={true}>Register</RaisedButton>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <RaisedButton onClick={this.seeReservations} primary={true}>See {!this.state.reservations? "My Reservations": "All books"}</RaisedButton>
                                        <ToolbarSeparator/>
                                        <RaisedButton onClick={this.myBooks} primary={!this.state.myBooks} disabled={this.state.myBooks}>Books I Added</RaisedButton>
                                        <ToolbarSeparator/>
                                        <RaisedButton onClick={this.logout} primary={true}>Logout</RaisedButton>
                                    </React.Fragment>
                                }
                            </div>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <Content logged={this.state.logged} reservations={this.state.reservations} myBooks={this.state.myBooks} edit={this.editABook}/>
            </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withCookies(App);
