import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import FormComponent from "../components/FormComponent";
import SingleComponent from "../components/SingleComponent";
import NavbarComponent from "../components/NavbarComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="container p-5">
        <NavbarComponent />
        <Switch>
          <Route path="/" component={App} exact />
          <Route path="/create" component={FormComponent} exact />
          <Route path="/blog/:slug" component={SingleComponent} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
