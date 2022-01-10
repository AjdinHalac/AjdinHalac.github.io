import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BioCerticaLogin } from "./react-biocertica-login";

const responseGoogle = (response: any) => {
  console.log(response);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <BioCerticaLogin
            clientId="d916027f-2f42-4b38-b2aa-b9eecb1dd50d"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
      </header>
    </div>
  );
}

export default App;
