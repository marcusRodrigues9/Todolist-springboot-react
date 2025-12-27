import { useEffect, useState } from "react";
import { BiTask, BiTrash } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { taskService } from "../../service/taskService";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Erro ao carregar tarefas");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (inputValue.trim() === "") return;

    try {
      const newTask = {
        title: inputValue,
        completed: false,
      };
      const savedTask = await taskService.createTask(newTask);
      setTasks([...tasks, savedTask]);
      setInputValue("");
      setError("");
    } catch (err) {
      setError("Erro ao adicionar tarefa");
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
      setError("");
    } catch (err) {
      setError("Erro ao deletar tarefa");
      console.log(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);

      // Chama o método PATCH
      const updatedTask = await taskService.updateStatus(id, !task.completed);

      // Atualiza o estado
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      setError("");
    } catch (err) {
      setError("Erro ao atualizar tarefa");
      console.error(err);
    }
  };

  return (
    <div className="bg-white px-6 py-10 mt-30 rounded-4xl">
      <header className="flex items-center justify-center ">
        <BiTask className="text-2xl mr-1" />
        <input
          type="text"
          placeholder="digite o nome da tarefa"
          className="p-2 border-t-1 border-l-1 border-b-1 rounded-l-2xl outline-0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()} // ← ADICIONE
          disabled={loading} // ← ADICIONE
        />
        <button
          onClick={addTask}
          disabled={loading} // ← ADICIONE
          className="border-1 border-amber-500 rounded-r-2xl p-2 bg-amber-500 cursor-pointer hover:opacity-70 disabled:opacity-50" // ← ADICIONE disabled:opacity-50
        >
          <CgAdd className="text-2xl text-white" />
        </button>
      </header>
      {/* Exibir erros */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Exibir loading */}
      {loading && (
        <div className="mt-4 text-center text-gray-500">Carregando...</div>
      )}
      <main className="mt-4">
        <div>
          {tasks.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-400">
              Nenhuma tarefa ainda. Adicione uma acima! 📝
            </div>
          )}
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span
                    className={
                      task.completed ? "line-through text-gray-400" : ""
                    }
                  >
                    {task.title}
                  </span>
                </div>

                <button onClick={() => deleteTask(task.id)}>
                  {" "}
                  <BiTrash className="text-3xl bg-red-600 text-white p-0.5 rounded-2xl cursor-pointer hover:opacity-75" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
