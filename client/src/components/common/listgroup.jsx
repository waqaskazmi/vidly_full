import React, { Component } from "react";

const ListGroup = ({ items, textProperty, valueProperty, selectedItem, filter }) => {
  return (
    <ul className="list-group">
      {items.map((x) => {
        return (
          <li
            className={
              selectedItem === x[valueProperty]
                ? "list-group-item active"
                : "list-group-item"
            }
            key={x[valueProperty]}
            style={{ cursor: "pointer" }}
            onClick={() => filter(x[valueProperty])}
          >
            {x[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
textProperty :"name",
valueProperty : "_id"
}

export default ListGroup;
