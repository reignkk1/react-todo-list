import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ICard {
  isDragging: boolean;
}
interface ITodoIndex {
  todoId: number;
  todoText: string;
  index: number;
}

const Card = styled.div<ICard>`
  background-color: ${(props) => (props.isDragging ? "white" : "white")};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 5px 10px rgba(0,0,0,0.5)" : "none"};
  margin-top: 10px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DraggableCard({ todoId, todoText, index }: ITodoIndex) {
  return (
    <Draggable key={todoId} draggableId={todoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {todoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
