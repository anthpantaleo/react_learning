// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import "./App.css";
import * as React from "react";

const initialStories = [
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

// const getAsyncStories = () =>
//   new Promise((resolve) =>
//     setTimeout(() => resolve({ data: { stories: initialStories } }), 1000)
//   );
// new Promise((resolve, reject) => setTimeout(reject, 2000)); this can cause errors
const API_ENDPOINT = `https:/hn.algolia.com/api/v1/search?query=`;

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
    // case "SET_STORIES":
    //   return action.payload;
    // case "REMOVE_STORY":
    //   return state.filter(
    //     (story) => action.payload.objectID !== story.objectID
    //   );
    // default:
    //   throw new Error();
  }

  // if (action.type === "SET_STORIES") {
  //   return action.payload;
  // } else if (action.type === "REMOVE_STORY") {
  //   return state.filter((story) => action.payload.objectID !== story.objectID);
  // } else {
  //   throw new Error();
  // }
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
  const [searchTerm, setSearchTerm] = useStorageState("searchValue", "React");
  // const [stories, setStories] = React.useState([]);
  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // const [isLoading, setIsLoading] = React.useState(false);
  // const [isError, setIsError] = React.useState(false);
  const handleFetchStories = React.useCallback(() => {
    if (!searchTerm) return;

    dispatchStories({ type: "STORIES_FETCH_INIT" });
    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
      })
      .catch(() => {
        dispatchStories({ type: "STORIES_FETCH_FAILURE" });
      }, [searchTerm]);

    React.useEffect(() => {
      handleFetchStories();
    }, [handleFetchStories]);
  });

  React.useEffect(() => {
    // If `searchTerm` is not present
    // e.g null, empty string, undefined
    // do nothing
    if (!searchTerm) return;
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    // getAsyncStories()
    fetch(`${API_ENDPOINT}${searchTerm}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
          // payload: result.data.stories,
        });
        // setStories(result.data.stories);
        // setIsLoading(false);
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, [searchTerm]);

  const handleRemoveStory = (item) => {
    // const newStories = stories.filter(
    //   (story) => item.objectID !== story.objectID
    // );
    dispatchStories({ type: "REMOVE_STORY", payload: item });
    // setStories(newStories);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // const searchedStories = stories.data.filter((story) =>
  //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div>
      <h1>Hacker Stories on React</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search: </strong>
      </InputWithLabel>

      <hr />
      {stories.isError && <>Something went wrong...</>}
      {stories.isLoading ? (
        <>Loading...</>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
      ))}
    </ul>
  );
};

const Item = ({ item, onRemoveItem }) => {
  const handleRemoveItem = () => {
    onRemoveItem(item);
  };
  return (
    <li>
      <span>
        <a href={item.url} target="_blank">
          {item.title}
        </a>
      </span>
      <span> - {item.author}</span>
      <span> - {item.num_comments} comments</span>
      <span> - {item.points} points - </span>
      <span>
        <button type="button" onClick={handleRemoveItem}>
          Dismiss
        </button>
      </span>
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
        onInput={onInputChange}
        autoFocus={isFocused}
      />
      <p>
        Searching for <strong>{value}</strong>
      </p>
    </>
  );
};

export default App;
