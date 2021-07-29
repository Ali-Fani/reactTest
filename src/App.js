import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import SensorsScreen from "./screens/SensorsScreen";
import NavBar from "./components/NavBarComponent";
import ActorsScreen from "./screens/ActorsScreen";
import NotfoundScreen from "./screens/NotfountScreen";

function App() {
  return (
    <Router>
      <NavBar />
      <main className="py-4">
        <Container>
          <Switch>
            <Route path="/" component={SensorsScreen} exact />
            <Route path="/actors" component={ActorsScreen} exact />
            <Route component={NotfoundScreen} />
          </Switch>
        </Container>
      </main>
    </Router>
  );
}

export default App;
