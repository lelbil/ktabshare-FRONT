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

const books = [
    {
        title: "Sherlock Holmes: The Complete Stories",
        author: "Sir Arthur Conan Doyle",
        language: "english",
        description: "A dazzling compendium featuring all four original Sherlock Holmes novels Perfect for mystery lovers, this anthology collects together the only four full-length novels starring the super sleuth Sherlock Holmes.",
        coverPath: "https://images.gr-assets.com/books/1417088970l/617375.jpg",
    },
    {
        title: "A Song Of Ice And Fire: A Feast Of Crows",
        author: "George R.R Martin",
        language: "english",
        description: "A Feast for Crows is the fourth of seven planned novels in the epic fantasy series A Song of Ice and Fire by American author George R. R. Martin.",
        coverPath: "https://images-na.ssl-images-amazon.com/images/I/71nJQs9rawL.jpg",
    },
    {
        title: "Margaret Thatcher: The Autobiography",
        author: "Margaret Thatcher",
        language: "english",
        description: "A newly edited, single-volume commemorative edition of 'The Path to Power' and 'The Downing Street Years'; this is Margaret Thatcher in her own words.",
        coverPath: "https://images-na.ssl-images-amazon.com/images/I/51nf32f38EL._SY344_BO1,204,203,200_.jpg",
    },
    {
        title: "Physics of the Future",
        author: "Michio Kaku",
        language: "english",
        description: "Physics of the Future: How Science Will Shape Human Destiny and Our Daily Lives by the Year 2100 is a 2011 book by theoretical physicist Michio Kaku, author of Hyperspace and Physics of the Impossible.",
        coverPath: "https://images-eu.ssl-images-amazon.com/images/I/51YwpRXgorL._SY291_BO1,204,203,200_QL40_.jpg",
    },
    {
        title: "Parce que je t'aime",
        author: "Guillaume Musso",
        language: "french",
        description: "Layla, une petite fille de cinq ans, disparaît dans un centre commercial de Los Angeles. Ses parents, brisés, finissent par se séparer. Cinq ans plus tard, elle est retrouvée à l'endroit exact où on avait perdu sa trace. Elle est vivante, mais reste plongée dans un étrange mutisme. À la joie des retrouvailles, succèdent alors les interrogations. Où était Layla pendant cette période? Avec qui ? Et surtout pourquoi est-elle revenue ?",
        coverPath: "http://www.guillaumemusso.com/wp-content/uploads/2014/03/9782845635395-625x1024.jpg",
    },
]

class BookList extends Component {
    render = () => (
        <div id="bookContainer">
            {
                books.map(book => (
                    <Paper className="bookPanel" zDepth={3}>
                        <div className="bookPanelContent">
                            <img className="bookCover" alt={book.title} src={book.coverPath} style={styles.bookCover}/>
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