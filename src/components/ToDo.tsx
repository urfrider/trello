import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: name } = event;
    console.log(name);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To do
        </button>
      )}
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;

// const onClick = (newCategory: IToDo["category"]) => {
//     console.log(newCategory);
//   };
//   return (
//     <li>
//       <span>{text}</span>
//       {category !== "TO_DO" && (
//         <button onClick={() => onClick("TO_DO")}>To do</button>
//       )}
//       {category !== "DOING" && (
//         <button onClick={() => onClick("DOING")}>Doing</button>
//       )}
//       {category !== "DONE" && (
//         <button onClick={() => onClick("DONE")}>Done</button>
//       )}
//     </li>
//   );
