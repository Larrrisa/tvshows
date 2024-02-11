import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/CardPageStyle.css";
import { useAppSelector, useAppDispatch } from "../hooks";
import { getData } from "../store/slice";

function Card() {
  const dispatch = useAppDispatch();
  let { id } = useParams();
  const data = useAppSelector((state) => state.data.data);

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="container">
      {data?.map((item) => {
        return Number(id) === item.id ? (
          <div key={item.id} className="card">
            <h1>{item.name}</h1>
            <div className="content">
              <img src={item.image.medium} alt={item.name}></img>
              <span
                className="description"
                dangerouslySetInnerHTML={{ __html: item.summary }}
              ></span>
            </div>
          </div>
        ) : null;
      })}
      <button className="link">
        <Link to="/">Back</Link>
      </button>
    </div>
  );
}

export default Card;
