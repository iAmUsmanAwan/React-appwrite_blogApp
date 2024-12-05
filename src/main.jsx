import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import { Provider } from 'react-redux'
import store from "./store/store.js"

import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Protected from "./components/AuthLayout.jsx"
import Signup from "./pages/Signup.jsx"
import AllPosts from "./pages/AllPosts.jsx"
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"



//? when we import and use createBrowserRouter 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [    //? all the subpaths go into children
      {
        path: "/React-appwrite_blogApp",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/all-posts",
        element: (      //? here when authenthication is true then load AllPosts page
          <Protected authentication>
            <AllPosts />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication>
            <AddPost />
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication>
            <Post />
          </Protected>
        ),
      },
    ],
  },
],
  { 
    basename: '/React-appwrite_blogApp' 
  } // Set the basename for routing, which will comes first from every component

);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)




//? when we import and use  { import {BrowserRouter, Routes, Route} from "react-router-dom"  }

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<App />}>
//             <Route index element={<Home />} />
//             <Route
//               path="/login"
//               element={
//                 <Protected authentication={false}>
//                   <Login />
//                 </Protected>
//               }
//             />
//             <Route
//               path="/signup"
//               element={
//                 <Protected authentication={false}>
//                   <Signup />
//                 </Protected>
//               }
//             />
//             <Route
//               path="/all-posts"
//               element={
//                 <Protected authentication>
//                   <AllPosts />
//                 </Protected>
//               }
//             />
//             <Route
//               path="/add-post"
//               element={
//                 <Protected authentication>
//                   <AddPost />
//                 </Protected>
//               }
//             />
//             <Route
//               path="/edit-post/:slug"
//               element={
//                 <Protected authentication>
//                   <EditPost />
//                 </Protected>
//               }
//             />
//             <Route
//               path="/post/:slug"
//               element={
//                 <Protected authentication>
//                   <Post />
//                 </Protected>
//               }
//             />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );