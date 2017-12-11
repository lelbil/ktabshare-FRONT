import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import './BookList.css'

const styles = {
    bookCover: {
        boxShadow: "2px 2px 2px #888",
        borderRadius: "5px",
        border: "solid 1px black",
    },
    bookDescription: {
        fontSize: "14px",
        textAlign: "justify",
    },
}

const getAllBooksEndPoint = "http://localhost:3005/books"
const defaultBookCoverImageUrl = "https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg"

class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            perPage: 1,
            books: [],
            responseStatus: 200,
        }
    }

    componentDidMount() {
        fetch(`${getAllBooksEndPoint}`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('There was an error')
                }
                return response.json()
            })
            .then(data => {
                this.setState({ books: data.books })
            });
    }

    componentWillReceiveProps (props) {
        const query = props.query
        fetch(`${getAllBooksEndPoint}?title=${query.title}&author=${query.author}&languages=${query.languages}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ books: data.books })
            })
    }

    render = () => (
        <div id="bookContainer">
            {
                (this.state.responseStatus !== 200) ?
                    <h1>There have been an error while fetching books</h1>
                :
                    this.state.books.map(book => (
                        <Paper className="bookPanel" zDepth={3}>
                            <div className="bookPanelContent">
                                <img className="bookCover" alt={book.title} src={book.coverPath || defaultBookCoverImageUrl } style={styles.bookCover}/>
                                <div className="bookInfo">
                                    <h3 className="bookTitle">{book.title}</h3>
                                    <br/>
                                    <h5 className="authorName">{book.author}</h5>
                                    <p className="bookDescription" style={styles.bookDescription}>{book.description}</p>
                                </div>
                                <div className="buttons">
                                    <RaisedButton backgroundColor="rgb(237, 218, 220)">BUY</RaisedButton>
                                    <RaisedButton>DONATE</RaisedButton>
                                </div>
                            </div>
                        </Paper>
                    ))


            }
        </div>
    )
}

export default BookList