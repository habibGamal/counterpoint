import React from "react";
import Card from "./Card";

const CardList = ({ list }: { list: string[] }) => {
  return (
    <Card>
      <ul className="list-points">
        {list.map((item, index) => {
          return (
            <li key={index} className="point">
              {item}
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default CardList;
