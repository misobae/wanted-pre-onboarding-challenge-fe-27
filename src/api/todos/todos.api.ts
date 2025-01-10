import { fetchData } from "../fetchData";
import { TodoRequest, TodoResponse, TodoDataContents } from "./todos.dto";

export const getTodoList = () => {
  return fetchData<TodoResponse<TodoDataContents[]>>(`/todos`);
};

export const getTodoById = (todoId: string) => {
  return fetchData<TodoResponse<TodoDataContents>>(`/todos/${todoId}`);
};

export const postTodo = ({ title, content }: TodoRequest) => {
  return fetchData<TodoResponse<TodoDataContents>>(`/todos`, {
    method: "POST",
    body: { title, content },
  });
};

export const updateTodo = (todoId: string, { title, content }: TodoRequest) => {
  return fetchData<TodoResponse<TodoDataContents>>(`/todos/${todoId}`, {
    method: "PUT",
    body: { title, content },
  });
};

export const deleteTodo = (todoId: string) => {
  return fetchData<TodoResponse<null>>(`/todos/${todoId}`, {
    method: "DELETE",
  });
};
