import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Profile from "../../game/Profile";
import EditProfile from "../../game/EditProfile";
import SuccessRegister from "../../register/SuccessRegister";
import Register from "../../register/Register";
import FailedRegister from "../../register/FailedRegister";
import EditProfileFail from "../../game/EditProfileFail";
import FailedLogin from "../../login/FailedLogin";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
                path="/profile"
                render={() => (
                    <GameGuard>
                        <Profile />
                    </GameGuard>
                )}
              />
              <Route
                  path="/editProfile"
                  render={() => (
                      <GameGuard>
                          <EditProfile />
                      </GameGuard>
                  )}
              />
              <Route
                  path="/editProfileFail"
                  render={() => (
                      <GameGuard>
                          <EditProfileFail />
                      </GameGuard>
                  )}
              />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
              <Route
                  path="/register"
                  exact
                  render={() => (
                          <Register />
                  )}
              />
              <Route
                  path={"/failedRegister"}
                  render={() => (
                      <FailedRegister/>
                  )}
              />
              <Route
                  path={"/failedLogin"}
                  render={() => (
                      <FailedLogin/>
                  )}
              />
            <Route path="/" exact render={() => <Redirect to={"/game"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
