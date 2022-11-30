// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import "./App.css";
import * as React from "react";

const title = "React!";

const welcome = {
  greeting: "Hey",
  title: "React",
};

function App() {
  return (
    <div>
      <h1>
        {welcome.greeting}, {welcome.title}
      </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
