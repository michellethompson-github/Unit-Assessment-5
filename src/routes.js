import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Auth from "./Components/Auth/Auth";
import Dash from "./Components/Dash/Dash";
import Form from "./Components/Form/Form";
import Post from "./Components/Post/Post";

function Routes() {
    return(
        <Router>
            <Switch>
                <Route exact path="/">
                    <Auth />
                </Route>               
                <Route exact path="/dash">
                    <Dash />
                </Route>           
                <Route exact path="/form">
                    <Form />
                </Route> 
                <Route exact path="/post/:id">
                    <Post />
                </Route>               
            </Switch>
       </Router>
    )
}

export default Routes;
