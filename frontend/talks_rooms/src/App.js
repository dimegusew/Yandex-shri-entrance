import React from "react";
import "./App.css";
import client from "./client.js";
import { ApolloProvider } from "react-apollo";
import Hat from "./Components/Hat.js";
import Form from "./Form.js";
import Footer from "./Components/Footer.js";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Hat />
        <Form />
        <Footer />
      </div>
    </ApolloProvider>
  );
};
export default App;
