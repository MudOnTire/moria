import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { StoreProvider } from 'Src/store';
import Editor from 'Src/pages/Editor';

import 'Src/common/css/normalize.css';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <div className="App" style={{backgroundColor: 'crimson'}}>
          <Switch>
            <Route exact path="/">
              <Editor />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
