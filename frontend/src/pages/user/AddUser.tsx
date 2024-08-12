import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

interface Genders {
  gender_id: number;
  gender: string;
}

interface Errors {
  first_name?: string[];
  middle_name?: string[];
  last_name?: string[];
  age?: string[];
  gender?: string[];
  birth_date?: string[];
  username?: string[];
  password?: string[];
}

function AddUser() {
  const [state, setState] = useState({
    genders: [] as Genders[],
    first_name: "",
    middle_name: "",
    last_name: "",
    age: "",
    gender: "",
    birth_date: "",
    username: "",
    password: "",
    errors: {} as Errors,
  });

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveUser = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .post("http://127.0.0.1:8000/api/user/store", state, {
        headers: { "X-CSRF-TOKEN": csrfToken },
      })
      .then((res) => {
        if (res.data.status === 200) {
          setState((prevState) => ({
            ...prevState,
            first_name: "",
            middle_name: "",
            last_name: "",
            age: "",
            gender: "",
            birth_date: "",
            username: "",
            password: "",
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
          console.error("Unexpected status error: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected server error: ", error);
      });
  };

  useEffect(() => {
    document.title = "LIST OF USERS";
    handleLoadGenders();
  }, []);

  return (
    <>
      <Navbar />
      <form onSubmit={handleSaveUser}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className={`form-control ${
              state.errors.first_name ? "is-invalid" : ""
            }`}
            id="first_name"
            name="first_name"
            onChange={handleInput}
            value={state.first_name}
          />
          {state.errors.first_name && (
            <p className="text-danger">{state.errors.first_name[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="middle_name" className="form-label">
            Middle Name
          </label>
          <input
            type="text"
            className={`form-control ${
              state.errors.middle_name ? "is-invalid" : ""
            }`}
            id="middle_name"
            name="middle_name"
            onChange={handleInput}
            value={state.middle_name}
          />
          {state.errors.middle_name && (
            <p className="text-danger">{state.errors.middle_name[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className={`form-control ${
              state.errors.last_name ? "is-invalid" : ""
            }`}
            id="last_name"
            name="last_name"
            onChange={handleInput}
            value={state.last_name}
          />
          {state.errors.last_name && (
            <p className="text-danger">{state.errors.last_name[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className={`form-control ${state.errors.age ? "is-invalid" : ""}`}
            id="age"
            name="age"
            onChange={handleInput}
            value={state.age}
          />
          {state.errors.age && (
            <p className="text-danger">{state.errors.age[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            className={`form-control ${
              state.errors.gender ? "is-invalid" : ""
            }`}
            name="gender"
            id="gender"
            onChange={handleInput}
            value={state.gender}
          >
            <option value="" selected>
              N/A
            </option>
            {state.genders.map((gender) => (
              <option value={gender.gender_id}>{gender.gender}</option>
            ))}
          </select>
          {state.errors.gender && (
            <p className="text-danger">{state.errors.gender[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="birth_date" className="form-label">
            Birth Date
          </label>
          <input
            type="date"
            className={`form-control ${
              state.errors.birth_date ? "is-invalid" : ""
            }`}
            id="birth_date"
            name="birth_date"
            onChange={handleInput}
            value={state.birth_date}
          />
          {state.errors.birth_date && (
            <p className="text-danger">{state.errors.birth_date[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className={`form-control ${
              state.errors.username ? "is-invalid" : ""
            }`}
            id="username"
            name="username"
            onChange={handleInput}
            value={state.username}
          />
          {state.errors.username && (
            <p className="text-danger">{state.errors.username[0]}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={`form-control ${
              state.errors.password ? "is-invalid" : ""
            }`}
            id="password"
            name="password"
            onChange={handleInput}
            value={state.password}
          />
          {state.errors.password && (
            <p className="text-danger">{state.errors.password[0]}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default AddUser;
