import React from 'react'

function Logo({width = "100%"}) {
    return (
        <img src='https://cdn.pixabay.com/photo/2020/04/04/03/42/book-5000692_640.png' 

        // style={{width}}
        className="w-20 h-20 object-cover rounded-xl p-2 m-2"  
        alt='Logo placeholder' />
    )
}

export default Logo