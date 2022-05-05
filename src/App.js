import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

import Create from "./pages/partycreate";
import View from "./pages/partyview";
import Coution from "./pages/caution";
import Mypage from "./pages/mypage";
import Main from "./pages/main";
import TestPage from "./pages/TestPage";

import { Input, Button, Text, Grid } from "./elements/index";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/view/:id" component={View}></Route>
        <Route path="/coution" component={Coution}></Route>
        <Route path="/mypage" component={Mypage}></Route>
        <Route path="/test" component={Button}></Route>
        <Route path="/testpage" component={TestPage}></Route>
      </ConnectedRouter>
    </div>
  );
}

export default App;
