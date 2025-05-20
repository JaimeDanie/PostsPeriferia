import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const Posts = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const baseUrl = `${import.meta.env.VITE_URL_POST}/posts`;

  const fetchPosts = async () => {
    const res = await axios.get(baseUrl, {
      headers: {
        Authorization: `bearer ${localStorage.getItem("token")}`,
      },
    });
    setPosts(res.data);
  };

  const like = async (id: string) => {
    await axios.post(`${baseUrl}/${id}/like`);
    fetchPosts();
  };

  const createPost = async () => {
    await axios.post(baseUrl, { message });
    setMessage("");
    fetchPosts();
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div>
          <h2>Publicaciones</h2>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-11">
          <input
            value={message}
            className="form-control"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nuevo mensaje"
          />
        </div>
        <div className="col-1">
          <button className="btn btn-primary" onClick={createPost}>
            Publicar
          </button>
        </div>
      </div>

      {posts.map((post) => (
        <div className="card mb-2" key={post.id}>
          <div className="card-body">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div> {post.message}</div>
              <button className="btn btn-info" onClick={() => like(post.id)}>
                ({post.likedBy.length}) 👍
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
