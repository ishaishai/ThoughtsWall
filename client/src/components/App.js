import NavBar from "./NavBar";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./App-Mobile.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
