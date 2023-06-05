import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./Home";
// import Game from "./Game";
// import Result from "./Result";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="" element={<Home />} />
//         <Route path="/game" element={<Game />} />
//         <Route path="/result" element={<Result />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import ChildRegistrationForm from "./ChildRegistrationForm";
import "../styles/form.css";
import ChildLoginForm from "./ChildLoginForm";
import "../styles/App.css";
import Home from "./home/Home";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import FamilyMember from "./familyMember/FamilyMember";

const App = () => {
  const ChildData = useSelector((state) => state.childData.childData);

  return (
    <>
      <BrowserRouter>
        {" "}
        {ChildData !== null && <Home />}
        <Routes>
          <Route
            path="/"
            element={
              ChildData !== null ? (
                <Navigate to="/Profile" />
              ) : (
                <ChildLoginForm />
              )
            }
          />
          <Route
            path="/register"
            element={
              ChildData !== null ? (
                <Navigate to="/Profile" />
              ) : (
                <ChildRegistrationForm />
              )
            }
          />
          <Route
            path="/login"
            element={
              ChildData !== null ? (
                <Navigate to="/Profile" />
              ) : (
                <ChildLoginForm />
              )
            }
          />

          <Route
            path="/profile"
            element={
              ChildData === null ? <Navigate to="/login" /> : <Profile />
            }
          />
          <Route
            path="/familyMember"
            element={
              ChildData === null ? <Navigate to="/login" /> : <FamilyMember />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
