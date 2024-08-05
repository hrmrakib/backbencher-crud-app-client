import React, { useState } from "react";

const users = [
  {
    id: 1,
    name: "Rakib",
    email: "rakib@gmail.com",
  },
  {
    id: 2,
    name: "sakib",
    email: "sakib@gmail.com",
  },
  {
    id: 3,
    name: "faysal",
    email: "faysal@gmail.com",
  },
];

// function UserList({ users, onDelete, onEdit }) {
function UserList() {
  const [nameError, setNameError] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);

  const handleCreateUser = (e) => {
    e.preventDefault();
    setNameError("");

    const userName = e.target.name.value.trim();
    const userEmail = e.target.email.value;

    if (userName.length < 3) {
      return setNameError("Name must be 3 characters");
    }

    console.log({ userName, userEmail });

    setTimeout(() => {
      return setOpenUserModal(false);
    }, 999);
  };

  const handleDelete = () => {};

  const handleOpenUserModal = () => {
    return setOpenUserModal(true);
  };
  const handleCloseUserModal = () => {
    return setOpenUserModal(false);
  };

  return (
    <div className='table_container'>
      <div className='header_box'>
        <h2 className='container_heading'>Users Information</h2>
        <button onClick={handleOpenUserModal} className='btn'>
          Add
        </button>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th className='t_heading'>#</th>
            <th className='t_heading'>Name</th>
            <th className='t_heading'>Email</th>
            <th className='t_heading action_end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className='tbody_row'>
              <td className='tbody_data'>{index + 1}</td>
              <td className='tbody_data'>{user?.name}</td>
              <td className='tbody_data'>{user?.email}</td>

              <td className='tbody_data'>
                <div className='action'>
                  <button className='btn update_button'>Update</button>

                  <button
                    onClick={() => handleDelete(user)}
                    className='btn delete_button'
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create user form */}
      {openUserModal && (
        <div className='create_user'>
          <div className='create_user_heading'>
            <h2>Create a new user</h2>
            <div onClick={handleCloseUserModal} className='close_user_modal'>
              Close
            </div>
          </div>
          <form onSubmit={handleCreateUser} className='user_form'>
            <input type='text' name='name' placeholder='Enter name' required />
            <p className='error'>{nameError}</p>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              required
            />
            <button type='submit' className='btn submit_btn'>
              Submit
            </button>
          </form>
        </div>
      )}

{/* up */}
      <div className='create_user'>
        <div className='create_user_heading'>
          <h2>Create a new user</h2>
          <div onClick={handleCloseUserModal} className='close_user_modal'>
            Close
          </div>
        </div>
        <form onSubmit={handleCreateUser} className='user_form'>
          <input type='text' name='name' placeholder='Enter name' required />
          <p className='error'>{nameError}</p>
          <input type='email' name='email' placeholder='Enter email' required />
          <button type='submit' className='btn submit_btn'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserList;
