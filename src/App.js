import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { StoreProvider } from 'Src/store';
import Editor from 'Src/pages/Editor';
import Carousel from 'Src/widgets/data_display/Carousel';

import 'antd/dist/antd.css';
import 'Src/common/css/normalize.css';
import 'Src/common/scss/index.scss';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        {/* <Carousel /> */}
        <div className="App">
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
