import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoAtom } from "../atom";

interface IForm {
  todo: string;
}

const Form = styled.form`
  display: flex;
  input {
    width: 400px;
    padding: 10px 20px;
    border: solid 3px #47b5ff;
    outline: none;
    font-size: 20px;
    text-align: center;
  }
  button {
    padding: 12.5px;
    cursor: pointer;
    background-color: #47b5ff;
    border: solid 3px #47b5ff;
    border-left: none;
    font-size: 16px;
  }
`;

function Input() {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoAtom);
  const onSubmit = ({ todo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: todo,
    };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        ["할일목록"]: [newTodo, ...allBoards["할일목록"]],
      };
    });
    setValue("todo", "");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="할일을 적어주세요!"
        {...register("todo", { required: true })}
      />
      <button>추가</button>
    </Form>
  );
}

export default Input;
