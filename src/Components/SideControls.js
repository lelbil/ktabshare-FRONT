import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import {blue500} from 'material-ui/styles/colors'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'

import './SideControls.css'


class SideControls extends Component {
    render = () => (
        <div id={"sideControls"} style={{backgroundColor: "rgba(0, 0, 0, 0.2)", margin: "10px", borderRadius: "10px", paddingBottom: "40px", overflow: "auto"}}>

            <List>
                <TextField id="titleSearchField" className="textField" floatingLabelText={"Title"} floatingLabelStyle={{color: "wheat"}} floatingLabelFocusStyle={{color: blue500}}/>
                <TextField id="authorSearchField" className="textField" floatingLabelText={"Author"} floatingLabelStyle={{color: "wheat"}} floatingLabelFocusStyle={{color: blue500}}/>
            </List>
            <Divider style={{backgroundColor: "black"}}/>
            <List style={{marginBottom: "20px"}}>
                <Subheader>Language Choice</Subheader>
                <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="English" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Arabic" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="French" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
            </List>
            <Divider style={{backgroundColor: "black"}}/>
            <List>
                <Subheader>Genres</Subheader>
                    <ListItem style={{marginBottom: "10px", marginTop: "-20px", textAlign: "left", color: "wheat"}} primaryText="Select All" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />

                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Science Fiction" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}}/>} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Drama" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Action And Adventure" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Romance" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Mystery" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Horror" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Self Help" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Health" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Guide" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Travel" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Children" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Religion" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Science" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Maths" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Poetry" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Encyclopedia" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Dictionary" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Comic" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Art" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Cookbook" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Biography" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Autobiography" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Fantasy" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={{margin: "-20px 0px", textAlign: "left", color: "wheat"}} primaryText="Other" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
            </List>

        </div>
    )
}

export default SideControls