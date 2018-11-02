// import React, { Component } from 'react';
// import { hot } from 'react-hot-loader';
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import reducers from './reducers'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk'
// import {attachAnUnexpectedErrorLogger} from "redux-manager-lib";
//
// import PostList from "./components/posts-list";
//
//
// const store = createStore(reducers, composeWithDevTools(
//     applyMiddleware(thunk),
//     // other store enhancers if any
// ));
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//
//   render() {
//       return (
//           <Provider store={store}>
//             <PostList/>
//         </Provider>)
//   }
// }
//
// attachAnUnexpectedErrorLogger();
// document.addEventListener("unexpectedruntimeerror", reduxManagerLibError => {
//     alert("Unexpected Runtime Error - Check the console")
// });
// export default hot(module)(App);


import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Demo1 from "./demo1";
import Demo2 from "./demo2";

export default ()=>(<div>
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">demo1</Link>
                </li>
                <li>
                    <Link to="/demo1">demo1</Link>
                </li>
                <li>
                    <Link to="/demo2">demo2</Link>
                </li>
            </ul>
            <hr />

            <Route exact path="/" component={Demo1} />
            <Route exact path="/demo1" component={Demo1} />
            <Route path="/demo2" component={Demo2} />
        </div>
    </Router>
</div>);