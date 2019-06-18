import React from "react";
const ListGroup = props => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item[valueProperty]}
          onClick={onItemSelect.bind(this, item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};
export default ListGroup;
