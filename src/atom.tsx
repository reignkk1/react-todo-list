import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ITodo {
  id: number;
  text: string;
}

interface ITodoAtom {
  [key: string]: ITodo[];
}

const { persistAtom } = recoilPersist();

export const todoAtom = atom<ITodoAtom>({
  key: "todo",
  default: {
    할일목록: [],
    하는중: [],
    "완료!!": [],
  },
  effects_UNSTABLE: [persistAtom],
});
