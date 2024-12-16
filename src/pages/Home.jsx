import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import authService from '../appwrite/auth';


function Home() {

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null);  // State to store the current user

    useEffect(() => {
        // Check if the user is logged in
        authService.getCurrentUser().then((currentUser) => {
            setUser(currentUser);  // Set the user state
        });

        // Fetch posts only if user is logged in
        if (user) {
            appwriteService.getPosts([]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [user]);  // Re-run the effect when 'user' changes

    // If posts are empty and user is not logged in, show login prompt
    if (posts.length === 0 && !user) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className="flex flex-wrap">
                        <h1>Welcome to Blog App</h1>
                        {/* <hr className="my-4" /> 
                        Line added with margin for spacing, add if needed */}
                    </div>
                    <h2>Login to read posts</h2>
                </Container>
            </div>
        );
    }

    // If user is logged in and posts are available
    return (
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
    );


    // useEffect(() => {
    //     appwriteService.getPosts([]).then((posts) => {
    //     if (posts) {
    //         setPosts(posts.documents)
    //     }
    //     })
    // }, [])
    // if (posts.length === 0) {
    //     return (
    //     <div className='w-full py-8'>
    //     <Container>
    //         <div className="flex flex-wrap">
    //         <h1>Welcome to Blog App</h1>
    //         {/* <hr className="my-4" /> 
    //         Line added with margin for spacing add if needed */}
    //         </div>
    //         <h2>Login to read posts</h2>
    //     </Container>
    //     </div>
    //     )
    // }

    // return (
    //     <div className='w-full py-8'>
    //     <Container>
    //         <div className="flex flex-wrap">
    //         {posts.map((post) => (
    //             <div className="p-2 w-1/4" key={post.$id}>
    //             <PostCard {...post} />
    //             </div>
    //         ))}
    //         </div>
    //     </Container>
    //     </div>
    // )
}

export default Home