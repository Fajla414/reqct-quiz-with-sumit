import React from "react";
import { BrowserRouter } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Result from "./pages/Result";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        {/* <SignUp /> */}
        {/* <Login /> */}
        {/* <Quiz /> */}
        <Result />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
