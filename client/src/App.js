import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";
import { Auth } from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google'

import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));
    return(
        <GoogleOAuthProvider 
            clientId='58957300193-n86uslt8bo6q2en5fhncjomoldr16qac.apps.googleusercontent.com'>
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={()=> <Redirect to='/posts' />} />
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" component={PostDetails} />
                        <Route path="/auth" exact component={()=> (!user ? <Auth/>:<Redirect to="/posts"/>)} />
                    </Switch>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    )
}

export default App;