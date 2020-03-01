import React from "react";
import "./App.css";
import { data } from "./database/data";
import Nav from "./components/Nav";
import Body from "./components/Body";
import Footer from "./components/Footer";
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
