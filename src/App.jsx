import { AddTasks } from "./components/tasks/AddTasks";
import { TaskList } from "./components/tasks/TaskList";

function App() {
  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center gap-7 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold underline">
            Welcome to your daily routine app!
          </h1>

          <p>This app will help you plan and track your tasks.</p>
          <p>To get started, add some tasks to your list.</p>
        </div>

        <div>
          <AddTasks />
          <TaskList />
        </div>
      </div>
    </>
  );
}

export default App;
