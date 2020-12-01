import { PropsWithChildren, useContext } from "react";
import { Route, Redirect, RouteComponentProps, RouteProps } from "react-router-dom";
import { Auth } from "../context/auth.context";

function ProtectedRoute({ children, ...others }: PropsWithChildren<RouteProps>) {
  const { user } = useContext(Auth);

  function render({ location }: RouteComponentProps) {
    if (user.displayName !== null) {
      return children;
    } else {
      return (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      )
    }
  }

  return (
    <Route {...others} render={render} />
  );
}

export default ProtectedRoute;