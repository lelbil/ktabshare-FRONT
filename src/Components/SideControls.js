import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import {blue500} from 'material-ui/styles/colors'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'

import './SideControls.css'

const styles = {
    sideControls: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        margin: "10px",
        borderRadius: "10px",
        paddingBottom: "40px",
        overflow: "auto",
    },
    divider: {
        backgroundColor: "black",
    },
    list: {
        marginBottom: "20px",
    },
    listItem: {
        margin: "-20px 0px",
        textAlign: "left",
        color: "wheat",
    },
}

class SideControls extends Component {
    render = () => (
        <div id={"sideControls"} style={styles.sideControls}>
            <List>
                <TextField id="titleSearchField" className="textField" floatingLabelText={"Title"} floatingLabelStyle={{color: "wheat"}} floatingLabelFocusStyle={{color: blue500}}/>
                <TextField id="authorSearchField" className="textField" floatingLabelText={"Author"} floatingLabelStyle={{color: "wheat"}} floatingLabelFocusStyle={{color: blue500}}/>
            </List>
            <Divider style={styles.divider}/>
            <List style={styles.list}>
                <Subheader>Language Choice</Subheader>
                <ListItem style={styles.listItem} primaryText="English" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                <ListItem style={styles.listItem} primaryText="Arabic" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                <ListItem style={styles.listItem} primaryText="French" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
            </List>
            <Divider style={{backgroundColor: "black"}}/>
            <List>
                <Subheader>Genres</Subheader>
                    <ListItem style={{marginBottom: "10px", ...styles.listItem}} primaryText="Select All" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Science Fiction" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}}/>} />
                    <ListItem style={styles.listItem} primaryText="Drama" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Action And Adventure" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Romance" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Mystery" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Horror" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Self Help" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Health" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Guide" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Travel" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Children" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Religion" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Science" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Maths" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Poetry" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Encyclopedia" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Dictionary" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Comic" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Art" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Cookbook" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Biography" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Autobiography" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Fantasy" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                    <ListItem style={styles.listItem} primaryText="Other" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
            </List>
        </div>
    )
}

export default SideControls