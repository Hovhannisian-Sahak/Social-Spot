import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Upload from "./pages/Upload.tsx";
import Profile from "./pages/Profile.tsx";
import Post from "./pages/Post.tsx";
import Feed from "./pages/Feed.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/post",
    element: <Post />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>
);
