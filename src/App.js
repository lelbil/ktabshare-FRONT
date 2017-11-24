import React, { Component } from 'react';
import './App.css';
import FlatButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import {GridList, GridTile} from 'material-ui/GridList';
import BookList from './Components/BookList'
import TextField from 'material-ui/TextField'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            <div id={"boxesContainer"}>
                <div id={"box1"} className={"box"}>
                    <Toolbar id={"toolbar"}>
                        <ToolbarGroup id={"toolbarGroup"}>
                            <div id={"toolbarTitle"}>
                                <ToolbarTitle text="KtabShare"/>
                                <ToolbarSeparator/>
                            </div>
                            <div id={"toolbarControls"}>
                                <section id={"login"} className={"login"}>
                                    <form action={""} className="login">
                                        <input type={"text"} placeholder={"Username"} style={{height:"30px"}}/>
                                        <input type={"password"} placeholder={"Password"} style={{height:"30px"}}/>
                                        {/*<TextField hintText={"Username"} floatingLabelText={"Username"}/>
                                        <TextField hintText={"Password"} floatingLabelText={"Password"} type={"Password"}/>*/}
                                        <FlatButton primary={true}>Login</FlatButton>
                                    </form>
                                </section>
                                <ToolbarSeparator/>
                                <FlatButton id={"registerButton"} primary={true}>Register</FlatButton>
                            </div>

                        </ToolbarGroup>
                    </Toolbar>
                </div>
                <div id={"content"}>
                    <div id={"box2"} className={"box"}>

                    </div>
                    <div id={"box3"} className={"box"}>
                            <BookList/>
                    </div>
                </div>

            </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
