import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Genders {
  gender_id: number;
  gender: string;
}

function Genders() {
  const [state, setState] = useState<{
    genders: Genders[];
  }>({
    genders: [],
  });

  const handleLoadGenders = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/genders")
      .then((res) => {
        if (res.data.status === 200) {
          setState((prevState) => ({
            ...prevState,
            genders: res.data.genders,
          }));
        } else {
          console.error("Unexpected code status: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected error: ", error);
      });
  };

  useEffect(() => {
    document.title = "LIST OF GENDERS";
    handleLoadGenders();
  }, []);

  return (
    <>
      <Link to={"/gender/add"} className="btn btn-primary">
        Add Gender
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {state.genders.map((gender) => (
            <tr key={gender.gender_id}>
              <td>{gender.gender_id}</td>
              <td>{gender.gender}</td>
              <td>
                <div className="btn-group">
                  <Link
                    to={`/gender/edit/${gender.gender_id}`}
                    className="btn btn-success"
                  >
                    UPDATE
                  </Link>
                  <Link to={"#"} className="btn btn-danger">
                    DELETE
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Genders;
