import React, { Component } from 'react';
import './App.css';
import FlatButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
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
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <div id={"boxesContainer"}>
                <div id={"box1"} className={"box"}>
                    <Toolbar style={styles.toolbar} id={"toolbar"}>
                        <ToolbarGroup id={"toolbarGroup"}>
                            <div id={"toolbarTitle"}>
                                <ToolbarTitle text="KtabShare"/>
                                <ToolbarSeparator/>
                            </div>
                            <div id={"toolbarControls"}>
                                <section id={"login"} className={"login"}>
                                    <form action={""} className="login">
                                        <input type={"text"} placeholder={"Username"} style={styles.usernameInput}/>
                                        <input type={"password"} placeholder={"Password"} style={styles.passwordInput}/>
                                        <FlatButton primary={true}>Login</FlatButton>
                                    </form>
                                </section>
                                <ToolbarSeparator/>
                                <FlatButton id={"registerButton"} primary={true}>Register</FlatButton>
                            </div>
                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <Content query="ERZ BERZ"/>
            </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
