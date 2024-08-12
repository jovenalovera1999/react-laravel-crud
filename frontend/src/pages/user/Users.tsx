import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

interface Users {
  user_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: string;
  age: string;
  birth_date: string;
}

function Users() {
  const [state, setState] = useState({
    users: [] as Users[],
  });

  const handleLoadUsers = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/users")
      .then((res) => {
        if (res.data.status === 200) {
          setState((prevState) => ({
            ...prevState,
            users: res.data.users,
          }));
        } else {
          console.error("Unexpected status error: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected server error: ", error);
      });
  };

  const userFullName = (user: Users) => {
    if (!user.middle_name) {
      return `${user.last_name}, ${user.first_name}`;
    } else {
      return `${user.last_name}, ${user.first_name} ${user.middle_name[0]}.`;
    }
  };

  useEffect(() => {
    document.title = "LIST OF USERS";
    handleLoadUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="table-responsive">
        <table className="table">
          <thead>
            <th>#</th>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Birth Date</th>
            <th>Action</th>
          </thead>
          <tbody>
            {state.users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{userFullName(user)}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.birth_date}</td>
                <td>
                  <div className="btn-group">
                    <Link to={"#"} className="btn btn-success">
                      Update
                    </Link>
                    <Link to={"#"} className="btn btn-danger">
                      Danger
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users;
