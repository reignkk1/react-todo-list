import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoAtom } from "./atom";
import DropableBoard from "./components/Dropable";
import Input from "./components/Input";

const Wrapper = styled.div`
  max-width: 700px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  margin-top: 100px;
`;

const Delete = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width: 200px;
  height: 50px;
  font-size: ${(props) => (props.isDraggingOver ? "150px" : "100px")};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(todoAtom);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);

    if (!destination) return;

    if (destination?.droppableId === "휴지통") {
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        sourceCopy.splice(source.index, 1);
        return { ...allBoards, [source.droppableId]: sourceCopy };
      });
    } else if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const sourceObj = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, sourceObj);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    } else if (destination?.droppableId !== source.droppableId) {
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const desCopy = [...allBoards[destination.droppableId]];
        const sourceObj = sourceCopy[source.index];

        sourceCopy.splice(source.index, 1);
        desCopy.splice(destination.index, 0, sourceObj);

        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: desCopy,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Input />
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <DropableBoard
              key={boardId}
              toDos={toDos[boardId]}
              boardId={boardId}
            />
          ))}
        </Boards>
        <Droppable droppableId="휴지통">
          {(magic, snapshot) => (
            <Delete
              isDraggingOver={snapshot.isDraggingOver}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              <span>🗑</span>
            </Delete>
          )}
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
