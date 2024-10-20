import { ChangeEvent, FormEvent, useEffect, useState } from "react";
function App() {
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [version, setVersion] = useState<number>(0);
  useEffect(() => {
    const localStorageTodoList = localStorage.getItem("todos");
    if (localStorageTodoList) {
      setTodos(JSON.parse(localStorageTodoList));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //新しいTODO
    const newTodo: Todo = {
      inputValue: inputValue,
      id: todos.length,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
    console.log(todos);

    setVersion(version + 1);
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="">
        <div className="h-14"></div>
        <h1 className="text-5xl text-blue-300 font-bold underline">
          TODOリスト
        </h1>
        <div className="mt-5 m-auto  text-left">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            key={version}
            className="text-center"
          >
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              type="text"
              className="border-solid border-inherit border-4 rounded text-1xl"
              placeholder="TODO入力"
            />
            <input
              type="submit"
              value="作成"
              className="ml-3 border-2 bg-gray-100 text-gray-600"
            />
          </form>
          <div className="mt-5 w-auto">
            <ul className="flex flex-col">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="inline-block text-2xl  flex justify-between"
                >
                  <input
                    type="text"
                    value={todo.inputValue}
                    className={
                      todo.checked
                        ? "my-break-point:w-3/5 my-break-point:border-b-4 my-break-point:line-through border-b-4 line-through overflow-hidden text-ellipsis break-words "
                        : "my-break-point:w-3/5 my-break-point:border-b-4 overflow-hidden text-ellipsis break-words border-b-4 "
                    }
                    onChange={(e) => handleEdit(todo.id, e.target.value)}
                    disabled={todo.checked}
                  />
                  <input
                    type="checkbox"
                    className="my-break-point:scale-150 m-1"
                    onChange={(e) => handleChecked(todo.id, todo.checked)}
                  />
                  <button
                    className="text-sm border-2 bg-gray-100 text-gray-600 m-3 p-1 my-break-point:border-2 my-break-point:bg-gray-100 my-break-point:text-gray-600"
                    onClick={(e) => handleDelete(todo.id)}
                  >
                    消
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
