import React from "react";
import './App.css';
import 'fontsource-roboto';
import SignIn from "../Sign/SignIn";
import {BrowserRouter, Route} from "react-router-dom";
import SignUp from "../Sign/SignUp";
import Paperbase from "../Paperbase/Paperbase";



function App() {
    return (
        <BrowserRouter>
            <div>
                <Route path=''
                       render={() => <Paperbase />}/>
                <Route path='/signUp'
                       render={() => <SignUp/>}/>
                <Route path='/signIn'
                       render={() => <SignIn/>}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
