import React from "react";
import x_png from '../img/x.png';
export default function Todo({itemDetail, checked, id}) {
    return(
        <li className="todo-app__item">
            <div className="todo-app__checkbox">
              <input type="checkbox" id={id} defaultChecked={checked}></input>
              <label htmlFor={id}></label>
            </div>
            <h1 className="todo-app__item-detail">{itemDetail} </h1>
            <img src= {x_png} className="todo-app__item-x"></img>
        </li>
    );
}