import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import extendedDemoReducers from './reducers-extended'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import {attachAnUnexpectedErrorLogger} from "redux-manager-lib";

import PostListExtended from "./components/post-list-extended-version";


const storeExtendedDemo = createStore(extendedDemoReducers, composeWithDevTools(
    applyMiddleware(thunk),
    // other store enhancers if any
));
class App  extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Provider store={storeExtendedDemo}>
                <PostListExtended/>
            </Provider>)
    }
}

attachAnUnexpectedErrorLogger();
document.addEventListener("unexpectedruntimeerror", reduxManagerLibError => {
    alert("Unexpected Runtime Error - Check the console")
});
export default hot(module)(App);
