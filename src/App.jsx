import "./App.css";
import UserManagement from "./components/UserManagement";

function App() {
  return (
    <div className='app'>
      <h2 className='app_heading'>
        Simple CRUD Application - (React, Nodejs, Expressjs, MySQL)
      </h2>
      <UserManagement />
    </div>
  );
}

export default App;
