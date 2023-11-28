import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import FormComponent from "../components/FormComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={App} exact />
        <Route path="/create" component={FormComponent} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
