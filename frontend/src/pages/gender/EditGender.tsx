import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Errors {
  gender?: string[];
}

function EditGender() {
  const { gender_id } = useParams();
  const [state, setState] = useState({
    gender: "",
    errors: {} as Errors,
  });

  const handleFetchGender = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/gender/edit/${gender_id}`)
      .then((res) => {
        if (res.data.status === 200) {
          const { gender } = res.data.gender;
          setState({ gender, errors: {} });
        } else {
          console.error("Unexpected code status: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected error: ", error);
      });
  };

  useEffect(() => {
    handleFetchGender();
  }, [gender_id]);

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className={`form-control ${
              state.errors.gender ? "is-invalid" : ""
            }`}
            value={state.gender}
            id="gender"
            name="gender"
          />
          {state.errors.gender && (
            <p className="text-danger">{state.errors.gender[0]}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default EditGender;
