import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FormEvent, useState } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoApp />
    </>
  );
}

function TodoApp() {
  const [tasks, setTasks] = useState(new Array<string>());

  function handleTaskSubmit(taskDescription: string) {
    setTasks([taskDescription, ...tasks]);
  }

  return (
    <main className={styles['main']}>
      <div className={styles['task-manager']}>
        <TaskForm onTaskSubmit={(desc: string) => handleTaskSubmit(desc)}/>
        <ul className={styles['task-list']}>
          {tasks.map(t => <Task taskDescription={t} />)}
        </ul>
      </div>
    </main>
  );
}

function TaskForm({ onTaskSubmit }: { onTaskSubmit: (desc: string) => void }) {
  const [task, setTask] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onTaskSubmit(task);
    setTask('');
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className={styles['task-input']}>
        <input 
          type="text" 
          name="task" 
          id="task"
          placeholder="Create Todo-Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={styles['task-input__input']}
          required>
        </input>
        <button className={styles['task-input__btn']}>Add</button>
      </div>
    </form>
  );
}

function Task({ taskDescription }: { taskDescription: string }) {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={styles['task']}>
      <input 
        type="text" 
        disabled={disabled} 
        className={styles['task__input']}
        value={taskDescription}>
      </input>
      <button className={styles['task__btn']} onClick={() => setDisabled(!disabled)}>
        <Image
          width={63.23}
          height={65}
          src="/write.svg"
          alt="write image"
        />
      </button>
      <button className={styles['task__btn']}>
      <Image
        width={59.38}
        height={65}
        src="/delete.svg"
        alt="write image"
      />
      </button>
    </div>
  );
}
