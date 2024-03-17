import React from "react";
import CatFactForm from "./components/CatFactForm";
import AgeByName from "./components/AgeByName";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Cat Fact App</h1>
      <CatFactForm />
      <h1>Age by name App</h1>
      <AgeByName />
    </div>
  );
};

export default App;
