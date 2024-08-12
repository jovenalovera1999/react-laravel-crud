import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

interface Errors {
  gender?: string[];
}

function EditGender() {
  const { gender_id } = useParams();
  const [state, setState] = useState({
    gender: "",
    errors: {} as Errors,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateGender = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .put(`http://127.0.0.1:8000/api/gender/update/${gender_id}`, state, {
        headers: { "X-CSRF-TOKEN": csrfToken },
      })
      .then((res) => {
        if (res.data.status === 200) {
          handleFetchGender();
          setState((prevState) => ({
            ...prevState,
            errors: {} as Errors,
          }));
        } else {
          console.error("Unexpected status error: ", res.data.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          console.error("Unexpected server error: ", error);
        }
      });
  };

  const handleFetchGender = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/gender/edit/${gender_id}`)
      .then((res) => {
        if (res.data.status === 200) {
          setState((prevState) => ({
            ...prevState,
            gender: res.data.gender.gender,
          }));
        } else {
          console.error("Unexpected status error: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected server error: ", error);
      });
  };

  useEffect(() => {
    document.title = "EDIT GENDER";
    handleFetchGender();
  }, [gender_id]);

  return (
    <>
      <Navbar />
      <form onSubmit={handleUpdateGender}>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <input
            type="text"
            className={`form-control ${
              state.errors.gender ? "is-invalid" : ""
            }`}
            onChange={handleInput}
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
