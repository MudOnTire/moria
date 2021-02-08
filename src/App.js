import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { StoreProvider } from 'Src/store';
import Editor from 'Src/pages/Editor';
import Preview from 'Src/pages/Preview';

import 'antd/dist/antd.css';
import 'Src/common/css/normalize.css';
import 'Src/common/scss/index.scss';

function App() {
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
          </Switch>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
