import { Droppable } from "react-beautiful-dnd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import styled from "styled-components";
import { IAreaProps } from "./Board";

const TrashWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const Area = styled.div<IAreaProps>`
  .trash {
    font-size: ${(props) => (props.isDraggingOver ? "5.5rem" : "5rem")};
    background-color: ${(props) =>
      props.isDraggingOver ? "rgba(231, 198, 198, 0.5)" : "none"};
    border-radius: 50%;
    padding: 10px;
    transition: background-color 0.3s ease-in-out, font-size 0.3s ease-in-out;
  }
`;

function Trashbin() {
  return (
    <TrashWrapper>
      <Droppable droppableId="trash">
        {(magic, snapshot) => (
          <Area
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFrom={Boolean(snapshot.draggingFromThisWith)}
          >
            <DeleteForeverIcon className="trash" />
          </Area>
        )}
      </Droppable>
    </TrashWrapper>
  );
}

export default Trashbin;
