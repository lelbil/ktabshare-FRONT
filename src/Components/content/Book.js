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
        boxShadow: "4px 4px 4px #888",
        borderRadius: "5px",
        border: "solid 1px black",
    },
    bookDescription: {
        fontSize: "14px",
        textAlign: "justify",
    },
    bookContent: {
        display: "flex",
    },
    bookDetails: {
        padding: "20px 70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
    },
    actionButton: {
        marginRight: "10px",
        marginLeft: "10px",
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
            style={styles.actionButton}
        />,
        <RaisedButton
            label="Close"
            secondary={true}
            onClick={this.closeDialog}
            style={styles.actionButton}
        />,
    ]

    render = () => {

        const { book } = this.props

        return (
            <Dialog
                actions={this.actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.closeDialog}
                contentStyle={{width: '70%', maxWidth:'none'}}
            >
                <div style={{display: "flex"}}>
                    <div>
                        <img alt={book.title} src={book.coverPath || defaultBookCoverImageUrl } style={styles.bookCover}/>
                    </div>
                    <div style={styles.bookDetails}>
                        <p>
                            <h2>{book.title}</h2>
                            <h3>{book.author}</h3>
                        </p>

                        <p>{book.description}</p>
                        <p style={{display: "flex", justifyContent: "space-between"}}>
                            <span>
                                <b>Genres: </b><span>{book.genres}</span>
                            </span>
                            <span>
                                <b>Language: </b><span>{book.language}</span>
                            </span>
                        </p>
                    </div>
                </div>
            </Dialog>
        )
    }



}


export default Book