import { Routes, Route } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import RootLayout from "./pages/root/RootLayout";
import Home from "./pages/root/Home";
import SigninForm from "./pages/auth/form/SigninForm";
import SignupForm from "./pages/auth/form/SignupForm";
import './App.css'
import Profile from "./pages/root/Profile";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import {Toaster} from 'react-hot-toast'
import TokenChecker from "./components/TokenChecker";
import NotFound from "./components/NotFound";

function App() {

  return (
    <> 
     <TokenChecker/>
      <Routes>
      
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
  
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
      
        </Route>

        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Toaster position="top-right"/>
    </>
  )
}

export default App
