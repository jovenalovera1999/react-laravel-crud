import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

function DeleteGender() {
  const { gender_id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    gender: "",
  });

  const handleDeleteGender = async (e: FormEvent) => {
    e.preventDefault();

    const csrfToken = document
      .querySelector("meta[name='csrf-token']")
      ?.getAttribute("content");

    await axios
      .delete(`http://127.0.0.1:8000/api/gender/destroy/${gender_id}`, {
        headers: { "X-CSRF-TOKEN": csrfToken },
      })
      .then((res) => {
        if (res.data.status === 200) {
          navigate("/genders");
        } else {
          console.error("Unexpected status error: ", res.data.status);
        }
      })
      .catch((error) => {
        console.error("Unexpected server error: ", error);
      });
  };

  const handleFetchGender = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/gender/delete/${gender_id}`)
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
    document.title = "DELETE GENDER";
    handleFetchGender();
  }, [gender_id]);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <h5>
          Are you sure you want to delete this gender named "{state.gender}"?
        </h5>
        <form onSubmit={handleDeleteGender}>
          <div className="btn-group">
            <Link to={"/genders"} className="btn btn-primary">
              No
            </Link>
            <button type="submit" className="btn btn-danger">
              Yes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DeleteGender;
