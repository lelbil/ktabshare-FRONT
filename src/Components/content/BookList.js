import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Pagination from './Pagination'
import Snackbar from 'material-ui/Snackbar'

import _ from 'lodash'

import './BookList.css'

import { defaultBookCoverImageUrl } from '../../helpers/constants'
import Book from "./Book";

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
    h1Text: {
        fontFamily: 'Comic Sans MS',
        fontSize: '55px',
        color: 'rgb(95, 72, 29)',
        margin: 'auto',
        // Beautiful stroke in chrome
        webkitTextFillColor: "wheat",
        webkitTextStroke: "3px black",
    }
}

const api_uri = process.env.REACT_APP_API_URI || "http://localhost:3005"

const getAllBooksEndPoint = api_uri + "/books"
const seeReservationsEndPoint = api_uri + "/books/reservedByMe"
const myBooksEndPoint = api_uri + "/books/byMe"

class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            perPage: 1,
            books: [],
            book: null,
            responseStatus: 200,
            snackbarOpen: false,
        }
    }

    componentDidMount() {
        fetch(`${getAllBooksEndPoint}`)
            .then(response => {
                if (response.status !== 200) {
                    throw response
                }
                return response.json()
            })
            .then(data => {
                this.setState({
                    books: data.books,
                    page: data.page,
                    perPage: data.perPage,
                    count: data.count,
                    hasNextPage: data.hasNextPage,
                    reservations: false,
                })
            })
            .catch(error => {
                console.log("There has been an error while fetching books: ", error)
            });
    }

    componentWillReceiveProps (props) {
        const {title, author, languages, genres, page, perPage} = props.query

        this.setState({reservations: this.props.reservations}, () => {
            const link = this.props.reservations ? seeReservationsEndPoint : ( this.props.myBooks ? myBooksEndPoint : getAllBooksEndPoint)

            fetch(`${link}?title=${title}&author=${author}&languages=${languages}&genres=${genres}&page=${page}&perPage=${perPage}`, {
                credentials: 'include',
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ books: data.books,
                        page: data.page,
                        perPage: data.perPage,
                        count: data.count,
                        hasNextPage: data.hasNextPage,
                    })
                })
        })
    }

    showBook = book => {
        this.setState({ book })
    }

    nullBook = () => {
        this.setState({ book: null })
    }

    reserveBook = bookId => {
        if (!this.props.logged) {
            this.setState({
                snackbarOpen: true,
                snackbarMessage: "Please login or register"
            })
        }
        const reserveBookEndpoint = api_uri + `/books/${bookId}/reservation`

        fetch(reserveBookEndpoint, {
            credentials: 'include',
            method: 'put',
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        books: _.filter(this.state.books, obj => obj._id !== bookId),
                        snackbarOpen: true,
                        snackbarMessage: "Book added to cart :D",
                        book: null,
                    })
                } else {
                    console.log('There was an error, not reserved') //TODO: be more friendly mate, no one likes alerts
                }
            })
    }

    cancelBookReservation = bookId => {
        const reserveBookEndpoint = api_uri + `/books/${bookId}/cancelReservation`

        fetch(reserveBookEndpoint, {
            credentials: 'include',
            method: 'put',
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        books: _.filter(this.state.books, obj => obj._id !== bookId),
                        snackbarOpen: true,
                        snackbarMessage: "Order canceled!",
                        book: null,
                    })
                } else {
                    alert('There was an error, not canceled') //TODO: be more friendly mate, no one likes alerts
                }
            })
    }

    closingSnackBar = () => {
        this.setState({
            snackbarOpen: false,
        })
    }

    dialogReservation = bookId => {
        !this.props.reservations? this.reserveBook(bookId) : this.cancelBookReservation(bookId)
    }

    loadDefaultCover = e => {
        e.target.src = defaultBookCoverImageUrl
    }

    render = () => (
        <div id="bookContainer">
            {
                (this.state.responseStatus !== 200) ?
                    <h1>There have been an error while fetching books</h1>
                :
                    (
                        this.state.books && this.state.books.length === 0 ?
                            <h1 style={styles.h1Text}>No Books Found</h1>
                        :
                            <div>
                                <Snackbar
                                    open={this.state.snackbarOpen}
                                    message={this.state.snackbarMessage}
                                    autoHideDuration={4000}
                                    onRequestClose={this.closingSnackBar}
                                />
                                <Book logged={this.props.logged} isReserved={this.props.reservations} reservation={() => this.dialogReservation(this.state.book._id)} book={this.state.book} nullBook={() => {this.nullBook()}}/>
                                <Pagination pageChange={this.props.handlePage} page={this.state.page} perPage={this.state.perPage} count={this.state.count} hasNextPage={this.state.hasNextPage}/>
                                {this.state.books && this.state.books.map(book => (
                                    <Paper className="bookPanel" zDepth={3}>
                                        <div className="bookPanelContent">
                                            <img onError={this.loadDefaultCover} className="bookCover" alt={book.title} src={book.coverPath} style={styles.bookCover}/>
                                            <div className="bookInfo">
                                                <h3 className="bookTitle">{book.title}</h3>
                                                <br/>
                                                <h5 className="authorName">{book.author}</h5>
                                                <p className="bookDescription" style={styles.bookDescription}>{book.description}</p>
                                            </div>
                                            <div className="buttons">
                                                {this.props.reservations ?
                                                    <RaisedButton onClick={() => {this.cancelBookReservation(book._id)}} backgroundColor="rgb(237, 218, 220)">Cancel Order</RaisedButton>
                                                        :
                                                    <RaisedButton onClick={() => {this.reserveBook(book._id)}} backgroundColor="rgb(237, 218, 220)">Get it now</RaisedButton>
                                                }
                                                <RaisedButton onClick={() => {this.showBook(book)}}>Details</RaisedButton>
                                                {book.isMine && <RaisedButton onClick={() => {this.props.edit(book)}}>Edit Book</RaisedButton>}
                                            </div>
                                        </div>
                                    </Paper>
                                ))}
                                <Pagination style={{marginBottom: '30px'}} pageChange={this.props.handlePage} page={this.state.page} perPage={this.state.perPage} count={this.state.count} hasNextPage={this.state.hasNextPage}/>
                            </div>
                    )
            }
        </div>
    )
}

export default BookList