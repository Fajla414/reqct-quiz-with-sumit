import React from "react";
import { BrowserRouter } from "react-router-dom";
import "../styles/App.css";
import Layout from "./Layout";
import Quiz from "./pages/Quiz";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        {/* <SignUp /> */}
        {/* <Login /> */}
        <Quiz />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
