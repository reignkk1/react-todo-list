import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atom";
import DraggableCard from "./Draggable";

interface IArea {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}

interface IBoards {
  toDos: ITodo[];
  boardId: string;
}

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Area = styled.div<IArea>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ECB390"
      : props.draggingFromThis
      ? "#ECB390"
      : "#FAD9A1"};

  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

const Tittle = styled.h1`
  text-align: center;
  font-weight: 600;
  padding: 10px;
  font-size: 18px;
`;

function DropableBoard({ toDos, boardId }: IBoards) {
  return (
    <Wrapper>
      <Tittle>{boardId}</Tittle>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                todoId={todo.id}
                todoText={todo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default DropableBoard;
