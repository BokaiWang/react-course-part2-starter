import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useRef } from "react";
import { Todo } from "./hooks/useTodos";
import axios from "axios";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((res) => res.data),
    onMutate: (newTodo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);
      if (ref.current) {
        ref.current.value = "";
      }

      return { previousTodos };
    },
    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo.id === newTodo.id ? savedTodo : todo))
      );
    },
    onError: (error, newTodo, context) => {
      queryClient.setQueryData<Todo[]>(["todos"], context?.previousTodos);
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ref.current && ref.current.value) {
      addTodo.mutate({
        id: 0,
        title: ref.current?.value,
        completed: false,
        userId: 1,
      });
    }
  };

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form className="row mb-3" onSubmit={submitHandler}>
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
