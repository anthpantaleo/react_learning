// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import "./App.css";
import * as React from "react";

const welcome = {
  greeting: "Hey",
  title: "React",
};

const list = [
  {
    title: "React",
    url: "https://reactjs.org",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "Google",
    url: "https://google.ca",
    author: "AI",
    num_comments: 1000000,
    points: 0,
    objectID: 2,
  },
];

function App() {
  return (
    <div>
      <h1>
        {welcome.greeting}, {welcome.title}
      </h1>

      <Search />

      <hr />

      <List />
    </div>
  );
}

function List() {
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url} target="_blank">
                {item.title}
              </a>
            </span>
            <span> - {item.author}</span>
            <span> - {item.num_comments}</span>
            <span> - {item.points}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Search() {
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
