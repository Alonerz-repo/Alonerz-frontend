import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Create from "./page/particreate";
import View from "./page/partiview";
import Coution from "./page/caution";
import Mypage from "./page/mypage";
import Main from "./page/main";
import { Input } from "./element/index";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Main}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/view" component={View}></Route>
        <Route path="/coution" component={Coution}></Route>
        <Route path="/mypage" component={Mypage}></Route>
        <Route path="/test" component={Input}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
