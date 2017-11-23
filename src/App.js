import React, { Component } from 'react';
import './App.css';
import FlatButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import {GridList, GridTile} from 'material-ui/GridList';
import BookList from './Components/BookList'


class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
            {/*<Toolbar id={"toolbar"}>
                <ToolbarGroup>
                    <ToolbarTitle text="KtabShare"/>
                    <ToolbarSeparator/>
                <FlatButton primary={true}>Register</FlatButton>
                </ToolbarGroup>
            </Toolbar>*/}
            {/*<Drawer id={"drawer"}>
                <h1>In Da Drawer</h1>
            </Drawer>
            <div id={"booksContainer"}>
                <h1>Books need be here</h1>
                <h3>A mind needs books same as a sword needs some stone -Some Imp</h3>
            </div>
            <h1>Hello World</h1>
            <BookList/>*/}
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
                                        <input type={"text"} placeholder={"Username"} />
                                        <input type={"password"} placeholder={"Password"} />
                                        {/*<input type={"submit"} value={"LOGIN"} />*/}
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
                        <div id={"booksContainer"}>
                            <h1>Books need be here</h1>
                            <h3>A mind needs books same as a sword needs some stone -Some Imp</h3>
                        </div>
                    </div>
                </div>

            </div>

        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
