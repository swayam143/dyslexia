import React from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const TabsArr = [
  { title: "Profile", path: "/profile" },
  { title: "Family Members", path: "/familyMember" },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="row">
        <Logout />
      </div>

      <div className="row mt-3">
        <div
          className="d-flex algn-items-center flex-wrap justify-content-center"
          style={{ gap: "10px" }}
        >
          {TabsArr.map((data, i) => (
            <button
              key={i}
              style={{ width: "auto" }}
              className="px-3 prbutton"
              onClick={() => navigate(data.path)}
            >
              {data.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
