import React from "react";
import "./App.css";
import { data } from "./database/data";
import Nav from "./components/nav";
import Body from "./components/body";
import Footer from "./components/footer";
import PropTypes from "prop-types";

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Body data={data}></Body>
      <Footer></Footer>
    </div>
  );
}

App.propTypes = {
  data: PropTypes.array
};
export default App;
