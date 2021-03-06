import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { blue500 } from 'material-ui/styles/colors'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Snackbar from 'material-ui/Snackbar'
import joi from 'joi'
import _ from 'lodash'

import { defaultBookCoverImageUrl, languages, genres } from '../../helpers/constants'
import {capitalizeFirstLetters} from "../../helpers/index"

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

const languageList = languages.map(language => <MenuItem value={language} primaryText={capitalizeFirstLetters(language)}/>)

const validationMapping = {
    title: joi.string().trim().max(255).min(3).required(),
    author: joi.string().trim().min(3).max(55).allow(null),
    description: joi.string().allow(["", null]).max(1000),
}

const postBookValidation = joi.object().keys({
    title: joi.string().trim().max(255).min(3).required(),
    author: joi.string().trim().max(55).min(3).allow(null),
    imgUrl: joi.string().max(255).allow(null),
    language: joi.string().valid(languages).allow(null).required(),
    genres: joi.array().items(joi.string().max(50).valid(genres)).allow([]).required(),
    description: joi.string().allow(["", null]).max(1000),
})

const api_uri = process.env.REACT_APP_API_URI || "http://localhost:3005"

class AddOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            snackBarOpen: false,
            valid: false,
            title: "",
            author: "",
            description: "",
            imgUrl: null,
            language: "",
            genres: [],
            errors: {
                title: null,
                author: null,
                description: null,
            },
        }
    }

    componentWillReceiveProps(props) {
        if (props.isOpen) this.setState(_.assign(
            {
                open: true,
                snackbarMessage: props.book? "Book update successfully :D" : "Book added. Thanks for participating! ;)" ,
            },
            props.book
        ))
    }

    closeDialog = () => {
        this.setState({ open: false })
        this.props.close()
        if (this.props.book) {
            this.setState({ title: "", author: "", description: "", language: "", genres: [], })
        }
    }

    closingSnackBar = () => {
        this.setState({snackBarOpen: false})
    }

    submitForm = () => {
        const { title, author, description, genres, language, imgUrl } = this.state
        const body = {
            title,
            author,
            description,
            genres,
            language,
            coverPath: imgUrl,
        }
        fetch(`${api_uri}/books/${this.props.book? this.props.book._id : ""}`, {
            method: `${this.props.book? "put" : "post"}`,
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => {
                if (response.status === 201 || response.status === 200 || response.status === 204) {
                    this.setState({ snackBarOpen: true, title: "", author: "", description: "", language: "", genres: [] })
                    this.closeDialog()
                }
                else {
                    alert('there has been an error whilst creating the book!')
                }
                return response.json()
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    handleLanguageChange = (event, index, language) => this.setState({language}, this.validate());

    handleGenreChange = (event, index, genres) => {
        this.setState({genres}, this.validate());
    }

    changeCover = (e) => {
        this.setState({imgUrl: e.target.value})
    }

    nonWorkingCover = () => {
        this.setState({ imgUrl: null })
    }

    validate = () => {
        const validationObject = _.pick(this.state, ['title', 'author', 'imgUrl', 'language', 'genres', 'description'])
        const valid = ! joi.validate(validationObject, postBookValidation).error
        console.log("VALID", valid)
        this.setState({ valid })
    }

    change = (e) => {
        const { name, value } = e.target
        const newBookInfo = {}
        newBookInfo[name] = value
        const newErrorObject = {}
        newErrorObject[name] = joi.validate(value, validationMapping[name]).error && joi.validate(value, validationMapping[name]).error.message
        this.setState(Object.assign(newBookInfo, {errors: Object.assign(this.state.errors, newErrorObject)}), () => {this.validate()})
    }

    render = () => (
        <div>
            <Dialog
                title={this.props.book? `Edit ${this.props.book.title}` : "Add A New Book"}
                actions={[
                    <RaisedButton
                        label="Add"
                        isValid={false}
                        primary={true}
                        onClick={this.submitForm}
                        style={styles.actionButton}
                        disabled={this.state ? ! this.state.valid : true}
                    />,
                    <RaisedButton
                        label="Close"
                        secondary={true}
                        onClick={this.closeDialog}
                        style={styles.actionButton}
                    />,
                ]}
                modal={true}
                open={this.state.open}
                onRequestClose={this.closeDialog}
                contentStyle={{width: '50%', maxWidth:'none'}}
            >
                <div style={{ display: "flex", alignContent: "stretch", justifyContent: "stretch", }}>
                    <form style={{ display: "flex", flexDirection: "column", width: "70%" }}>
                        <TextField errorText={this.state.errors.title} value={this.state.title} onChange={this.change} fullWidth={true} name="title" floatingLabelText={"Title"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField errorText={this.state.errors.author} value={this.state.author} onChange={this.change} fullWidth={true} name="author" floatingLabelText={"Author"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField fullWidth={true} onChange={this.changeCover} value={this.state.imgUrl} name="imgURL" floatingLabelText={"Image URL"} floatingLabelFocusStyle={{color: blue500}}/>
                        <TextField errorText={this.state.errors.description} value={this.state.description} onChange={this.change} name="description"
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
                            floatingLabelText="Genres"
                            value={this.state.genres}
                            onChange={this.handleGenreChange}
                        >
                            {genres.map(genre => <MenuItem checked={this.state.genres.indexOf(genre) > -1} value={genre} primaryText={capitalizeFirstLetters(genre)}/>)}
                        </SelectField>
                    </form>
                    <div>
                        <img onError={this.nonWorkingCover} alt={"Preview of the book cover"} src={this.state.imgUrl || defaultBookCoverImageUrl} style={styles.bookCover}/>
                    </div>
                </div>
            </Dialog>
            <Snackbar
                open={this.state.snackBarOpen}
                message={this.state.snackbarMessage}
                autoHideDuration={4000}
                onRequestClose={this.closingSnackBar}
            />
        </div>

        )
}

export default AddOne