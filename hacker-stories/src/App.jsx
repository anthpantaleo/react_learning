// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import "./App.css";
import * as React from "react";

const welcome = {
  greeting: "Hey",
  title: "React!",
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
};

const App = () => {
  const stories = [
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

  const [searchTerm, setSearchTerm] = useStorageState("searchValue", "");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>
        {welcome.greeting}, {welcome.title}
      </h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} />
    </div>
  );
};

const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

const Item = ({ item }) => {
  return (
    <li>
      <span>
        <a href={item.url} target="_blank">
          {item.title}
        </a>
      </span>
      <span> - {item.author}</span>
      <span> - {item.num_comments} comments</span>
      <span> - {item.points} points</span>
    </li>
  );
};

const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  isFocused,
  children,
}) => {
  // const handleChange = (event) => {
  //   setSearchTerm(event.target.value);
  //   props.onSearch(event);
  // };

  const handleBlur = (event) => {
    console.log("unfocussed");
  };

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type}
        value={value}
        onBlur={handleBlur}
        onChange={onInputChange}
        autoFocus={isFocused}
      />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};

export default App;
