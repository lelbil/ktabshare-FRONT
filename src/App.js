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
        }
    }

    componentWillMount() {
        const { cookies } = this.props
        this.setState({
            logged: cookies.get('logged') || false
        })
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

    login = () => {
        const { cookies } = this.props
        cookies.set('logged', true)
    }

    closeRegisterPopover = () => {
        this.setState({
            register: false,
        })
    }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <AddOne isOpen={this.state.addBook} close={this.closeAddOneDialog} />
            <Register isOpen={this.state.register} close={this.closeRegisterPopover} anchorEl={this.state.registerAnchor} />
            <div id={"boxesContainer"}>
                <div id={"box1"} className={"box"}>
                    <Toolbar style={styles.toolbar} id={"toolbar"}>
                        <ToolbarGroup id={"toolbarGroup"}>
                            <div id={"toolbarTitle"}>
                                <ToolbarTitle text="KtabShare"/>
                                <ToolbarSeparator/>
                            </div>
                            <RaisedButton onClick={this.addABook} style={{ marginLeft: "auto",}} primary={true}>&nbsp;Add A Book <Add style={{margin: "auto"}} /></RaisedButton>
                            <div id={"toolbarControls"}>
                                {!this.state.logged && <section id={"login"} className={"login"}>
                                    <form action={""} className="login">
                                        <input type={"text"} placeholder={"Username"} style={styles.usernameInput}/>
                                        <input type={"password"} placeholder={"Password"} style={styles.passwordInput}/>
                                        <RaisedButton onClick={this.login} primary={true}>Login</RaisedButton>
                                    </form>
                                </section>}
                                <ToolbarSeparator/>
                                <RaisedButton id={"registerButton"} onClick={this.signup} primary={true}>Register</RaisedButton>
                            </div>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <Content/>
            </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default withCookies(App);
