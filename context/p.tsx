'use client';

import { useState } from 'react';
import { useImmerReducer } from 'use-immer';

type ToDoTask = {
  id: number;
  text: string;
  done: boolean;
};

function AddTask({ onAddTask }: { onAddTask: (text: string) => void }) {
  const [text, setText] = useState('');
  return (
    <>
      <input placeholder='Add task' value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={() => {
          setText('');
          onAddTask(text);
        }}>
        Add
      </button>
    </>
  );
}

function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask,
}: {
  tasks: ToDoTask[];
  onChangeTask: (task: ToDoTask) => void;
  onDeleteTask: (taskId: number) => void;
}) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }: { task: ToDoTask; onChange: (task: ToDoTask) => void; onDelete: (taskId: number) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type='checkbox'
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type GlobalPayload = {
  added: {
    id: number;
    text: string;
  };
  changed: {
    task: ToDoTask;
  };
  deleted: {
    id: number;
  };
};

type GlobalContextState = typeof initialTasks;
type GlobalActionMap = ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>];

function tasksReducer(draft: GlobalContextState, action: GlobalActionMap) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.payload.id,
        text: action.payload.text,
        done: false,
      });
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.payload.id);
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text: string) {
    dispatch({
      type: 'added',
      payload: { id: nextId++, text },
    });
  }

  function handleChangeTask(task: ToDoTask) {
    dispatch({
      type: 'changed',
      payload: { task },
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: 'deleted',
      payload: { id: taskId },
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleDeleteTask} />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];
