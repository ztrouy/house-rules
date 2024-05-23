import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home.jsx";
import UserProfilesList from "./userprofiles/UserProfilesList.jsx";
import { UserProfileDetails } from "./userprofiles/UserProfileDetails.jsx";
import ChoresList from "./chores/ChoresList.jsx";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <Home loggedInUser={loggedInUser} />
            </AuthorizedRoute>
          }
        />
        <Route path="userprofiles">
          <Route 
            index 
            element={
              <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <UserProfilesList loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            } 
          />
          <Route path=":id">
            <Route 
              index 
              element={
                <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                  <UserProfileDetails loggedInUser={loggedInUser} />
                </AuthorizedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="chores">
          <Route 
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser}>
                <ChoresList loggedInUser={loggedInUser} />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
