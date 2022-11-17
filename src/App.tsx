import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import Trashbin from "./Components/Trashbin";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import CreateBoard from "./Components/CreateBoard";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  /* position: relative; */
  width: 80%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  min-width: 800px;
  min-height: 200px;
  /* grid-template-columns: repeat(3, 1fr); */
  gap: 20px;
  /* background-color: red; */
  flex-grow: 1;
`;

const Container = styled.div`
  height: 100vh;
`;

const closeBtnStyle = {
  position: "absolute",
  top: 20,
  right: 20,
};

function App() {
  const [open, setOpen] = useState(false);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onClick = () => {
    setOpen(true);
  };

  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;

    // no movement
    if (!destination) return;

    if (destination?.droppableId === "boards") {
      setToDos((allBoards) => {
        const temp = { ...allBoards };
        const order = Object.entries(temp);
        const srcTemp = order[source.index];
        const newTemp = {} as any;
        order.splice(source.index, 1);
        order.splice(destination.index, 0, srcTemp);
        order.forEach((element) => {
          newTemp[element[0]] = element[1];
        });
        console.log(newTemp);
        return {
          ...newTemp,
        };
      });
    } else {
      if (destination.droppableId === "trash") {
        setToDos((allBoards) => {
          const srcTemp = [...allBoards[source.droppableId]];
          srcTemp.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: srcTemp,
          };
        });
        return;
      }

      // movement in the same board
      if (destination?.droppableId === source.droppableId) {
        setToDos((allBoards) => {
          const temp = [...allBoards[source.droppableId]];
          const tempObj = temp[source.index];
          temp.splice(source.index, 1);
          temp.splice(destination.index, 0, tempObj);
          return {
            ...allBoards,
            [source.droppableId]: temp,
          };
        });
      }

      // movement across the board
      if (destination?.droppableId != source.droppableId) {
        setToDos((allBoards) => {
          const destTemp = [...allBoards[destination.droppableId]];
          const srcTemp = [...allBoards[source.droppableId]];
          const tempObj = srcTemp[source.index];
          srcTemp.splice(source.index, 1);
          destTemp.splice(destination.index, 0, tempObj);
          return {
            ...allBoards,
            [source.droppableId]: srcTemp,
            [destination.droppableId]: destTemp,
          };
        });
      }
    }
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <IconButton onClick={onClick} sx={closeBtnStyle}>
            <AddCircleIcon sx={{ fontSize: 60 }} />
          </IconButton>
          <Droppable type="board" direction="horizontal" droppableId="boards">
            {(magic) => (
              <Boards ref={magic.innerRef} {...magic.droppableProps}>
                {Object.keys(toDos).map((boardId, index) => (
                  <Draggable
                    key={"board-" + boardId}
                    index={index}
                    draggableId={"board-" + boardId}
                  >
                    {(magic) => (
                      <div ref={magic.innerRef}>
                        <div
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          <Board
                            toDos={toDos[boardId]}
                            boardId={boardId}
                            key={boardId}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
          {/* <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards> */}
        </Wrapper>
        <Trashbin />
        <CreateBoard open={open} setOpen={setOpen} />
      </DragDropContext>
    </Container>
  );
}

export default App;
