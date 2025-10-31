import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import App from "./App.jsx";
import "./index.css";
import outputs from "./aws-exports";

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="app-container">
      <Authenticator>
        <App />
      </Authenticator>
    </div>
  </React.StrictMode>
);

