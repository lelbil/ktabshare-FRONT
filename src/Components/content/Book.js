import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { defaultBookCoverImageUrl } from '../../helpers/constants'

const styles = {
    bookCover: {
        width: "20vw",
        height: "50vh",
        marginTop: "50px",
        marginLeft: "30px",
        float: "left",
        boxShadow: "4px 4px 4px #888",
        borderRadius: "5px",
        border: "solid 1px black",
    },
    bookDescription: {
        fontSize: "14px",
        textAlign: "justify",
    },
}

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    closeDialog = () => {
        this.setState({ open: false })
    }

    actions = [
        <RaisedButton
            label="Reserve"
            primary={true}
            //onClick={this.closeDialog}
        />,
        <RaisedButton
            label="Close"
            primary={true}
            onClick={this.closeDialog}
        />,
    ]

    render = () => {

        const { book } = this.props

        return (
            <Dialog
                //title={book.title}
                actions={this.actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.closeDialog}
                contentStyle={{width: '70%', maxWidth:'none'}}
            >
                    <img alt={book.title} src={book.coverPath || defaultBookCoverImageUrl } style={styles.bookCover}/>
                    <h2>{book.title}</h2>
                    <h3>{book.author}</h3>
                    <p>{book.description}</p>
                    <b>Genres: </b><span>{book.genres}</span>

                    <b>Language: </b><span>{book.language}</span>
            </Dialog>
        )
    }



}


export default Book