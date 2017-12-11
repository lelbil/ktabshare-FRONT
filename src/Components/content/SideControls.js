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


//Language
const ARABIC = 'arabic'
const ENGLISH = 'english'
const FRENCH = 'french'
const ITALIAN = 'italian'
const SPANISH = 'spanish'
const GERMAN = 'german'

const languages = [ ARABIC,  ENGLISH,  FRENCH,  ITALIAN,  SPANISH,  GERMAN]


const genres = [
    "Science Fiction",
    "Drama",
    "Action And Adventure",
    "Romance",
    "Mystery",
    "Horror",
    "Self Help",
    "Health",
    "Guide",
    "Travel",
    "Children",
    "Religion",
    "Science",
    "Maths",
    "Poetry",
    "Encyclopedia",
    "Dictionary",
    "Comic",
    "Art",
    "Cookbook",
    "Biography",
    "Autobiography",
    "Fantasy",
    "Other",
]

class SideControls extends Component {

    change = (e) => {
        const { value, name } = e.target
        this.props.handleChange(name, value)
    }

    languageChanged = (e) => {
        const { name, checked } = e.target
        this.props.handleLanguage(name, checked)
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
                    style={styles.listItem} primaryText={language} onChange={this.languageChanged} leftCheckbox={<Checkbox name={language}  iconStyle={{fill: "wheat"}}/>}
                />)}
            </List>
            <Divider style={{backgroundColor: "black"}}/>
            <List>
                <Subheader>Genres</Subheader>
                    <ListItem style={{marginBottom: "10px", ...styles.listItem}} primaryText="Select All" leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}} />} />

                {genres.map(genre => <ListItem
                        style={styles.listItem}
                        primaryText={genre}
                        leftCheckbox={<Checkbox iconStyle={{fill: "wheat"}}/>}
                    />)}
            </List>
        </div>
    )
}

export default SideControls