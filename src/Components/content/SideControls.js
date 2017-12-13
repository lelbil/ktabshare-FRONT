import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import {blue500} from 'material-ui/styles/colors'
import {List, ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox'

import { capitalizeFirstLetters } from '../../helpers'


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


//Language
const ARABIC = 'arabic'
const ENGLISH = 'english'
const FRENCH = 'french'
const ITALIAN = 'italian'
const SPANISH = 'spanish'
const GERMAN = 'german'

const languages = [ ARABIC,  ENGLISH,  FRENCH,  ITALIAN,  SPANISH,  GERMAN]


const genres = [
    "science fiction",
    "drama",
    "action and adventure",
    "romance",
    "mystery",
    "horror",
    "self help",
    "health",
    "guide",
    "travel",
    "children",
    "religion",
    "science",
    "maths",
    "poetry",
    "encyclopedia",
    "dictionary",
    "comic",
    "art",
    "cookbook",
    "biography",
    "autobiography",
    "fantasy",
    "other",
]

class SideControls extends Component {

    state = {
        checked: []
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
        this.props.handleGenre(name, checked)
    }

    render = () => (
        <div id={"sideControls"} style={styles.sideControls}>
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
                    <ListItem style={{marginBottom: "10px", ...styles.listItem}} primaryText="Select All" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />
                {genres.map(genre => <ListItem
                        style={styles.listItem}
                        primaryText={capitalizeFirstLetters(genre)}
                        onChange={this.genreChanged}
                        leftCheckbox={<Checkbox name={genre} iconStyle={{fill: "wheat"}}/>}
                    />)}
            </List>
        </div>
    )
}

export default SideControls