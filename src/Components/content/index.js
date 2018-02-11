import React, { Component } from 'react'
import _ from 'lodash'

import SideControls from './SideControls'
import BookList from './BookList'

const styles = {
    box2: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
}

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: {
                title: '',
                author: '',
                languages: [],
                genres: [],
                page: 1,
                perPage: 10,
            },
        }
    }

    handleChange = (field, value) => {
        const newFilter = {}
        newFilter[field] = value
        this.setState({query: Object.assign(this.state.query, newFilter)})
    }

    handleLanguage = (language, checked) => {
        if (checked) {
            const languages = _.concat(this.state.query.languages, language)
            this.setState({ query: Object.assign(this.state.query, {languages, page: 1}) })
        } else {
            const languages = _.difference(this.state.query.languages, [language])
            this.setState({ query: Object.assign(this.state.query, {languages, page: 1})})
        }
    }

    handleGenre = (genres) => {
        this.setState({query: Object.assign(this.state.query, {genres, page: 1})})
    }

    handlePage = (page, perPage) => {
        this.setState({ query: Object.assign(this.state.query, {page, perPage})})
    }

    render = () => (
        <div id={"content"}>
            <div id={"box2"} className={"box"} style={styles.box2} >
                <SideControls handleChange={this.handleChange} handleLanguage={this.handleLanguage} handleGenre={this.handleGenre}/>
            </div>
            <div id={"box3"} className={"box"}>
                <BookList query={this.state.query} handlePage={this.handlePage} reservations={this.props.reservations} myBooks={this.props.myBooks} edit={this.props.edit}/>
            </div>
        </div>
        )
}

export default Content