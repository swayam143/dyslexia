import React from "react";
import Logout from "./Logout";

const TabsArr = [
  { title: "Profile", path: "/profile" },
  { title: "Family Members", path: "/family" },
];

const Home = () => {
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
            <button style={{ width: "auto" }} className="px-3 prbutton">
              {data.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
