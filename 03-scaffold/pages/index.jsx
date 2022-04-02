import React from 'react';
import { useSnapshot } from 'valtio';
import { proxyWithComputed } from 'valtio/utils';

const state = proxyWithComputed(
  { todos: [] },
  {
    left: ({ todos }) => todos.filter((todo) => !todo.completed).length,
  }
);

window.g_state = state;

function TodoItem(props) {
  const { todo, onChange } = props;
  return (
    <div>
      <input type="checkbox" checked={todo.completed} onChange={onChange} />
      <span>{todo.text}</span>
    </div>
  );
}

function TodoFooter() {
  const { left } = useSnapshot(state);
  return (
    <div>
      <span>{left} items left</span>
    </div>
  );
}

function TodoAdd(props) {
  return <input onKeyDown={props.onAddTodo} />;
}

export default function TodoApp() {
  const { todos } = useSnapshot(state);
  function handleNewTodoKeyDown(e) {
    if (e.keyCode !== 13) return;
    e.preventDefault();
    const text = e.target.value;
    state.todos.push({
      id: Date.now(),
      text,
      completed: false,
    });
    e.target.value = '';
  }
  function handleTodoCompleted(id) {
    state.todos.forEach((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
    });
  }
  return (
    <div>
      <h2>Todos</h2>
      <div>
        <TodoAdd onAddTodo={handleNewTodoKeyDown} />
      </div>
      <div>
        {todos.length
          ? todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleTodoCompleted.bind(null, todo.id)}
            />
          ))
          : null}
      </div>
      <div>{todos.length ? <TodoFooter /> : null}</div>
    </div>
  );
}