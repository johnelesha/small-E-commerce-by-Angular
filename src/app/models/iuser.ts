import { ITodo } from "./itodo";

export interface IUser {
    id?: string;
    full_name: string;
    email: string;
    phone: string;
    password: string;
    age: number;
    gender: string;
    todos: ITodo[];
}
