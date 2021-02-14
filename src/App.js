import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { message } from 'antd';
import { StoreProvider } from 'Src/store';
import Editor from 'Src/pages/Editor';
import Preview from 'Src/pages/Preview';
import { getStorePages } from 'Src/uitls/fns';

import 'antd/dist/antd.css';
import 'Src/common/css/normalize.css';
import 'Src/common/scss/index.scss';

window.React = React;
window.message = message;

function App() {

  let pages = getStorePages();

  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Editor />
            </Route>
            <Route path="/preview">
              <Preview />
            </Route>
            {
              pages?.map(page => {
                return (
                  <Route path={`/${page.key}`} key={page.key}>
                    <Preview page={page} />
                  </Route>
                )
              })
            }
          </Switch>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
