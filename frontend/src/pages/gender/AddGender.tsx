import axios from "axios";
import React, {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  useState,
} from "react";

interface Errors {
  gender?: string[];
}

function AddGender() {
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

  const handleSaveGender = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .post("http://127.0.0.1:8000/api/gender/store", state, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setState((prevState) => ({
            ...prevState,
            gender: "",
            errors: {},
          }));
        } else {
          console.error("Unexpected code status: ", res.data.status);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setState((prevState) => ({
            ...prevState,
            errors: error.response.data.errors,
          }));
        } else {
          console.log("Unexpected error: ", error);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSaveGender}>
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

export default AddGender;
