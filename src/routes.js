import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react";
import Details from "./pages/Details";
import CreateBook from "./pages/CreateBook";
import LoginForm from "./pages/LoginForm";
import ListBook from "./pages/ListBook";

// import { Container } from './styles';

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/books" component={ListBook} />
        <Route path="/details/:id" exact component={Details} />
        <Route path="/details/edit/:id" component={CreateBook} />
        <Route path="/create" component={CreateBook} />
      </Switch>
    </BrowserRouter>
  );
}
