import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const goto = (url) => {
    navigate(url);
  };
  return localStorage.getItem("token") ? (
    <div className="container">
      <div
        className="mb-4 mt-2"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <button
          style={{ marginRight: "10px" }}
          className="btn btn-info"
          onClick={() => goto("/posts")}
        >
          posts
        </button>
        <button
          style={{ marginRight: "10px" }}
          className="btn btn-success"
          onClick={() => goto("/profile")}
        >
          Mi perfil
        </button>
        <button className="btn btn-danger" onClick={() => logout()}>
          Cerrar sesión
        </button>
      </div>
    </div>
  ) : null;
};
