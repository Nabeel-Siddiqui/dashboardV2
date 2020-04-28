import React from 'react'
import '../styling/quote.css'

export default function Quote( { quote } ) {

    return (
        <div className="quote-text">
            <h3> "{quote.quote}" - {quote.author} </h3>
        </div>
    )
}
