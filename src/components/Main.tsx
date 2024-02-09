import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { setAllData } from "../store/slice";
import { RootState } from "../store/store";
import { useFetchMainInfoQuery } from "../utils/api";
import { FaX } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa6";
import "../styles/MainPageStyle.css";

function Main() {
  const { data, error, isLoading, isFetching, isSuccess } =
    useFetchMainInfoQuery();

  console.log(data);
  return (
    <div className="container">
      <div className="heading">
        <h1>Choose your favourite shows</h1>
        <span className="filter">
          Show liked shows
          <FaFilter />
        </span>
      </div>

      <div className="main">
        {data?.map((item) => {
          return (
            <div key={item.id} className="card">
              <div className="icons">
                <FaRegHeart />
                <FaX />
              </div>
              <div className="card-body">
                <p className="name"> {item.name}</p>
                <span
                  className="description"
                  dangerouslySetInnerHTML={{ __html: item.summary }}
                ></span>
                <img src={item.image.original} alt={item.name}></img>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
