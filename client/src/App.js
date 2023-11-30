import axios from "./api";
import { useState, useEffect } from "react";
import formatDate from "./utils/formatDate";
import { Link } from "react-router-dom";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get("/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        alert((err) => alert(err));
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {blogs.map((blog, index) => (
        <div
          className="row"
          key={index}
          style={{ borderBottom: "1px solid silver" }}
        >
          <div className="col pt-3 pb-2">
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0, 250)}</p>
            <p className="text-muted">
              ผู้เขียน: {blog.author} เผยแพร่ : {formatDate(blog.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
