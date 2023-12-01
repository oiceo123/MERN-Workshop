import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import FormComponent from "../components/FormComponent";
import SingleComponent from "../components/SingleComponent";
import NavbarComponent from "../components/NavbarComponent";
import EditComponent from "../components/EditComponent";
import LoginComponent from "../components/LoginComponent";
import PrivateRoute from "./PrivateRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <div className="container p-5">
        <NavbarComponent />
        <Switch>
          <Route path="/" component={App} exact />
          <PrivateRoute path="/create" component={FormComponent} exact />
          <Route path="/blog/:slug" component={SingleComponent} exact />
          <PrivateRoute
            path="/blog/edit/:slug"
            component={EditComponent}
            exact
          />
          <Route path="/login" component={LoginComponent} exact />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
