import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { blue500 } from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import { languages, genres } from '../../helpers/constants'
import {capitalizeFirstLetters} from "../../helpers/index";

const styles = {
    bookCover: {
        width: "20vw",
        height: "50vh",
        marginTop: "50px",
        marginLeft: "30px",
        boxShadow: "4px 4px 4px #888",
        borderRadius: "5px",
        border: "solid 1px black",
    },
    actionButton: {
        marginRight: "10px",
        marginLeft: "10px",
    },
}

const languageList = languages.map(language => <MenuItem value={language} primaryText={language}/>)

class AddOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: this.props.addBook,
            imgUrl: "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg",
            language: "",
            genres: [],
        }
    }

    componentWillReceiveProps(props) {
        if (props.isOpen) this.setState({open: true})
    }

    closeDialog = () => {
        //TODO: make it save form to local storage before closing.
        console.log('this was called')
        this.setState({ open: false })
        this.props.close()
    }

    actions = [
        <RaisedButton
            label="Save"
            primary={true}
            //onClick={this.closeDialog}
            style={styles.actionButton}
            //disabled={this.props.book && this.props.book.status === "ready"}
        />,
        <RaisedButton
            label="Close"
            secondary={true}
            onClick={this.closeDialog}
            style={styles.actionButton}
        />,
    ]

    submitForm = () => {
        alert("ok")
    }

    handleLanguageChange = (event, index, language) => this.setState({language});

    handleGenreChange = (event, index, genres) => {
        this.setState({genres});
    }

    render = () => {

        //const { genres } = this.state

        return (
            <Dialog
                title="Add A New Book"
                actions={this.actions}
                modal={true} //TODO: turn back to true
                open={this.state.open}
                onRequestClose={this.closeDialog}
                contentStyle={{width: '50%', maxWidth:'none'}}
            >
                <div style={{ display: "flex", alignContent: "stretch", justifyContent: "stretch", }}>
                    <form style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                        <TextField fullWidth={true} name="title" floatingLabelText={"Title"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField fullWidth={true} name="author" floatingLabelText={"Author"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField fullWidth={true} name="imgURL" floatingLabelText={"Image URL"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField
                            floatingLabelText={"Description"}
                            multiLine={true}
                            fullWidth={true}
                            rows={1}
                            rowsMax={4}
                        />
                        <SelectField
                            value={this.state.language}
                            onChange={this.handleLanguageChange}
                            floatingLabelText="Language"
                        >
                            {languageList}
                        </SelectField>
                        <SelectField
                            multiple={true}
                            floatingLabelText="Genres (Max is 5)"
                            value={this.state.genres}
                            onChange={this.handleGenreChange}
                        >
                            {genres.map(genre => <MenuItem checked={this.state.genres.indexOf(genre) > -1} value={genre} primaryText={capitalizeFirstLetters(genre)}/>)}
                        </SelectField>
                    </form>
                    <div>
                        <img alt={"Preview of the book cover"} src={"https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"} style={styles.bookCover}/>
                    </div>
                </div>
            </Dialog>
        )
    }
}

export default AddOne