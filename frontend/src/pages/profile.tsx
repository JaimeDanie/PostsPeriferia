import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_URL_USER}/user/profile`, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => setProfile(res.data));
    }
  }, []);

  return profile ? (
    <div className="container">
      <h2>Mi perfil</h2>
      <p>Email: {profile.email}</p>
      <p>Nombre: {profile.name}</p>
      <p>Creado: {new Date(profile.createdAt).toLocaleString()}</p>
    </div>
  ) : (
    <p>Cargando...</p>
  );
};
