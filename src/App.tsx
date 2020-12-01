import ProtectedRoute from './components/ProtectedRoute';
import RSVP from './views/RSVP';
import Login from './views/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/rsvp">
            <RSVP />
          </ProtectedRoute>
          <Route path="/">
            <Redirect to="/rsvp" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
