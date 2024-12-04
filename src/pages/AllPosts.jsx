import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"


function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
        });
    }, []);
    
    // // TODO: add case for array length 0

    let content; 
    if (posts.length === 0) {
        content = <p>No posts available. Please check back later!</p>;
    } else {
    content = (
        <div className='w-full py-8'>
        <Container>
            <div className="flex flex-wrap">
            {posts.map((post) => (
                <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
                </div>
            ))}
            </div>
        </Container>
        </div>
    )}

    return (
        <div>
            {content}
        </div>
    )
}

export default AllPosts