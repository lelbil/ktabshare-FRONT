import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import {blue500} from 'material-ui/styles/colors'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'
import _ from 'lodash'

import { capitalizeFirstLetters } from '../../helpers'
import { languages, genres } from "../../helpers/constants"

const styles = {
    sideControls: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        margin: "10px",
        borderRadius: "10px",
        paddingBottom: "40px",
        overflow: "auto",
        fontFamily: "Comic Sans MS",
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

    constructor(props) {
        super(props)
        this.state = {
            checked: genres,
            canCheckAll: false,
        }
    }

    change = (e) => {
        const { value, name } = e.target
        this.props.handleChange(name, value)
    }

    languageChanged = (e) => {
        const { name, checked } = e.target
        this.props.handleLanguage(name, checked)
    }

    genreChanged = (e) => {

        const { name, checked } = e.target
        const newChecked = checked? _.concat(this.state.checked, name) : _.difference(this.state.checked, [name])

        this.setState(Object.assign({checked: newChecked}))
        this.props.handleGenre(newChecked)


    }

    checkAll = (e) => {

        let stateChange
        if (e.target.checked) {
            stateChange ={
                checked: genres,
                canCheckAll: false,
            }
        } else {
            stateChange = {
                checked: [],
                canCheckAll: true,
            }
        }

        this.setState(Object.assign(stateChange))
        this.props.handleGenre(stateChange.checked)
    }

    render = () => (
        <div style={styles.sideControls}>
            <List>
                <TextField name="title" id="titleSearchField" className="textField" floatingLabelText={"Title"} floatingLabelStyle={{color: "wheat"}} floatingLabelFocusStyle={{color: blue500}} onChange={this.change}/>
                <TextField name="author" id="authorSearchField" className="textField" floatingLabelText={"Author"} floatingLabelStyle={{color: "wheat"}} floatingLabelFocusStyle={{color: blue500}} onChange={this.change}/>
            </List>
            <Divider style={styles.divider}/>
            <List style={styles.list}>
                <Subheader>Language Choice</Subheader>
                {languages.map(language => <ListItem
                    style={styles.listItem} primaryText={capitalizeFirstLetters(language)} onChange={this.languageChanged} leftCheckbox={<Checkbox name={language}  iconStyle={{fill: "wheat"}}/>}
                />)}
            </List>
            <Divider style={{backgroundColor: "black"}}/>
            <List>
                <Subheader>Genres</Subheader>
                    <ListItem style={{marginBottom: "10px", ...styles.listItem, }} primaryText={(this.state.canCheckAll? "S": "Des") + "elect All"} onChange={this.checkAll} leftCheckbox={<Checkbox defaultChecked={true} iconStyle={{fill: "wheat"}} />} />
                {genres.map(genre => <ListItem
                        style={styles.listItem}
                        primaryText={capitalizeFirstLetters(genre)}
                        onChange={this.genreChanged}
                        leftCheckbox={<Checkbox checked={_.includes(this.state.checked, genre)} name={genre} iconStyle={{fill: "wheat"}}/>}
                    />)}
            </List>
        </div>
    )
}

export default SideControls