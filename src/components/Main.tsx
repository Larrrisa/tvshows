import { useState, useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../hooks";
import {
  getData,
  deleteCard,
  addFavorites,
  deleteFavorites,
  showFavorites,
} from "../store/slice";

import { FaX } from "react-icons/fa6";
import { FaRegHeart, FaHeart, FaFilter } from "react-icons/fa6";

import "../styles/MainPageStyle.css";

import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.data.data);
  const selectFavorites = useAppSelector((state) => state.data.favorites);
  const [isActive, setIsActive] = useState<Record<number, boolean>>({});
  const [showAllFavorites, setShowAllFavorites] = useState(false);

  useEffect(() => {
    dispatch(getData());
  }, []);

  function handleDeleteClick(id: number) {
    dispatch(deleteCard(id));
  }

  function handleFavoriteClick(id: number) {
    const isFavorite = selectFavorites.some((item) => item.id === id);
    if (isFavorite) {
      dispatch(deleteFavorites(id));
      setIsActive((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    } else {
      dispatch(addFavorites(id));
      setIsActive((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    }
  }

  function handleShowFavoriteClick() {
    if (!showAllFavorites) {
      dispatch(showFavorites({}));
      setShowAllFavorites(true);
    } else {
      dispatch(getData());
      setShowAllFavorites(false);
    }
  }

  function handleCardClick(id: number) {
    navigate(`/${id}`);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>TV shows</h1>
      </div>
      <div className="filter" onClick={() => handleShowFavoriteClick()}>
        <FaFilter />
      </div>

      <div className="main">
        {data?.map((item) => {
          return (
            <div key={item.id} className="main-card">
              <div className="icons">
                {isActive[item.id] ? (
                  <FaHeart onClick={() => handleFavoriteClick(item.id)} />
                ) : (
                  <FaRegHeart onClick={() => handleFavoriteClick(item.id)} />
                )}

                <FaX onClick={() => handleDeleteClick(item.id)} />
              </div>
              <div
                className="main-card__body"
                onClick={() => handleCardClick(item.id)}
              >
                <p className="name"> {item.name}</p>
                <span
                  className="main-description"
                  dangerouslySetInnerHTML={{ __html: item.summary }}
                ></span>

                {<img src={item.image.original} alt={item.name}></img>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
