import { useState } from "react";

import "./App.css";
import UserList from "./components/UserList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='app'>
      <h2 className='app_heading'>
        Simple CRUD Application - (React, Nodejs, Expressjs, MySQL)
      </h2>
      <UserList />
    </div>
  );
}

export default App;
