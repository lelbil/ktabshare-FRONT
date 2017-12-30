import React, { Component } from 'react';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import { Add } from 'material-ui-icons'
import AddOne from './Components/content/AddOne'

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

    constructor(props) {
        super(props)
        this.state = {
            addBook: false,
        }
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


  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <AddOne isOpen={this.state.addBook} close={this.closeAddOneDialog} />
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
                                <section id={"login"} className={"login"}>
                                    <form action={""} className="login">
                                        <input type={"text"} placeholder={"Username"} style={styles.usernameInput}/>
                                        <input type={"password"} placeholder={"Password"} style={styles.passwordInput}/>
                                        <RaisedButton primary={true}>Login</RaisedButton>
                                    </form>
                                </section>
                                <ToolbarSeparator/>
                                <RaisedButton id={"registerButton"} primary={true}>Register</RaisedButton>
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

export default App;
