import React from 'react'
import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config.js"

//* to take the user to the post when he clicks on a post
function PostCard({
    $id, title, featuredImage   // incase of mongodb we will use _id
}) {
    return (
    <Link to={`/post/${$id}`}>   //* as we want want this whole card to be click-able. also we have to import {link} from react-router-dom. In here we have mentioned the path where it will lead us when clicked
        <div
        className='w-full bg-gray-100 rounded-xl p-4'
        >
            <div
            className='w-full justify-center mb-4'
            >
                <img src={appwriteService.getFilePreview(featuredImage)}
                alt={title}
                className='rounded-xl'
                //* this featured image is coming from config.js from the appwrite folder in src. appwriteservice is the instance of a service that intract with appwrite. getfilepreview() is a method provided by this service to retrieve a preview URL for a file stored in Appwrite's storage. featuredImage is a prop passed to the PostCard component
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
    )
}

export default PostCard