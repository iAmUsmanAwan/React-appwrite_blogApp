import React from 'react'

function Logo({width = "100%"}) {
    return (
        <img src='https://files.oaiusercontent.com/file-AM3HdgEYdfmS2sduprubrb?se=2024-11-28T13%3A25%3A42Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Db6e99626-8217-4575-a480-fbd44c3a6724.webp&sig=sAD9LlqoIH6tNIuy6m8zRGTc0lHcZhpF0XSzbQ%2B269M%3D' 
        // style={{width}}
        className="w-20 h-20 object-cover rounded-xl p-2 m-2"  
        alt='Logo placeholder' />
    )
}

export default Logo