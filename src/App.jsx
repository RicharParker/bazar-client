import Home from "./pages/Home";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const App = () => {

  return (
    <Router>
        <Route exact path="/">
          <Home />
        </Route>
    </Router>
  );
};

export default App;
