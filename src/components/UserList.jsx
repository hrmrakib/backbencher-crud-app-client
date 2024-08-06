import React, { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";

function UserList() {
  const [nameError, setNameError] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const axiosPublic = useAxiosPublic();
  // const notify = (msg) => toast(msg);

  const handleCreateUser = (e) => {
    e.preventDefault();
    setNameError("");

    const userName = e.target.name.value.trim();
    const userEmail = e.target.email.value;

    if (userName.length < 3) {
      return setNameError("Name must be 3 characters");
    }

    axiosPublic
      .post("/create", { userName, userEmail })
      .then((res) => {
        console.log(res.data?.isExist);
        if (res.data?.isExist) {
          return toast.error("Email already exist!");
        }
        if (res.data.message === "success") {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${userName} is an user now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {});

    setTimeout(() => {
      return setOpenUserModal(false);
    }, 999);
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/delete/${email}`).then((res) => {
          console.log(res.data);
        });
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success",
        // });
      }
    });
  };

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then((res) => setUser(res?.data))
      .catch((error) => setError(error));
  }, [handleCreateUser]);

  const handleOpenUserModal = () => {
    return setOpenUserModal(true);
  };
  const handleCloseUserModal = () => {
    return setOpenUserModal(false);
  };

  return (
    <div className='table_container'>
      <Toaster position='top-center' reverseOrder={false} />
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
          {user.map((user, index) => (
            <tr key={index} className='tbody_row'>
              <td className='tbody_data'>{index + 1}</td>
              <td className='tbody_data'>{user?.name}</td>
              <td className='tbody_data'>{user?.email}</td>

              <td className='tbody_data'>
                <div className='action'>
                  <button className='btn update_button'>Update</button>

                  <button
                    onClick={() => handleDelete(user?.email)}
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

      {/* update user info */}
      {false && (
        <div className='create_user'>
          <div className='create_user_heading'>
            <h2>Update the user</h2>
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
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserList;
