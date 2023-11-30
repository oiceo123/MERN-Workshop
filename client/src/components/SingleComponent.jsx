import axios from "../api";
import { useState, useEffect } from "react";
import formatDate from "../utils/formatDate";
import parse from "html-react-parser";

function SingleComponent(props) {
  const param = props.match.params.slug;
  const [blog, setBlog] = useState("");

  useEffect(() => {
    axios
      .get(`/blog/${param}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <div className="pt-3">{parse(blog.content)}</div>
          <p className="text-muted">
            ผู้เขียน: {blog.author} เผยแพร่ : {formatDate(blog.createdAt)}
          </p>
        </>
      )}
    </>
  );
}

export default SingleComponent;
