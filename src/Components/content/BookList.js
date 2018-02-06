import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Pagination from './Pagination'

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
}

const getAllBooksEndPoint = "http://localhost:3005/books"
const seeReservationsEndPoint = "http://localhost:3005/books/reservedByMe"

class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            perPage: 1,
            books: [],
            book: null,
            responseStatus: 200,
        }
    }

    componentDidMount() {
        fetch(`${getAllBooksEndPoint}`)
            .then(response => {
                if (response.status !== 200) {
                    console.log('There was an error')
                    console.log('Response: ', response)
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
                })
            });
    }

    componentWillReceiveProps (props) {
        const {title, author, languages, genres, page, perPage} = props.query

        const link = this.props.reservations ? seeReservationsEndPoint : getAllBooksEndPoint

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
    }

    showBook = book => {
        this.setState({ book })
    }

    nullBook = () => {
        this.setState({ book: null })
    }

    removeBookFromBookList = bookId => {
        this.setState({
            books: _.filter(this.state.books, obj => obj._id !== bookId)
        })
    }

    reserveBook = bookId => {
        const reserveBookEndpoint = `http://localhost:3005/books/${bookId}/reservation`

        fetch(reserveBookEndpoint, {
            credentials: 'include',
            method: 'put',
        })
            .then(response => {
                if (response.status === 200 || response.status === 204) {
                    alert('book reserved successfully')
                    //TODO: Add a Snackbar instead of alert

                    this.removeBookFromBookList(bookId)
                } else {
                    alert('There was an error, not reserved') //TODO: be more friendly mate, no one likes alerts
                }
            })
    }

    cancelBookReservation = bookId => {
        const reserveBookEndpoint = `http://localhost:3005/books/${bookId}/cancelReservation`

        fetch(reserveBookEndpoint, {
            credentials: 'include',
            method: 'put',
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Reservation Canceled')
                    //TODO: Add a Snackbar instead of alert

                    this.removeBookFromBookList(bookId)
                } else {
                    alert('There was an error, not canceled') //TODO: be more friendly mate, no one likes alerts
                }
            })
    }

    render = () => (
        <div id="bookContainer">
            {
                (this.state.responseStatus !== 200) ?
                    <h1>There have been an error while fetching books</h1>
                :
                    <div>
                        <Book reservation={() => {this.reserveBook(this.state.book._id)}} book={this.state.book} nullBook={() => {this.nullBook()}}/>
                        <Pagination pageChange={this.props.handlePage} page={this.state.page} perPage={this.state.perPage} count={this.state.count} hasNextPage={this.state.hasNextPage}/>
                        {this.state.books && this.state.books.map(book => (
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
                                        {!this.props.reservations ?
                                            <RaisedButton onClick={() => {this.cancelBookReservation(book._id)}} backgroundColor="rgb(237, 218, 220)">Cancel Reservation</RaisedButton>
                                                :
                                            <RaisedButton onClick={() => {this.reserveBook(book._id)}} backgroundColor="rgb(237, 218, 220)">Reserve</RaisedButton>
                                        }
                                        <RaisedButton onClick={() => {this.showBook(book)}}>Details</RaisedButton>
                                    </div>
                                </div>
                            </Paper>
                        ))}
                    </div>
            }
        </div>
    )
}

export default BookList