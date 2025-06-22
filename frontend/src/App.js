import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from "./pages/Login/login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/home";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Home} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
