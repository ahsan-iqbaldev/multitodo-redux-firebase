import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../store/actions/todoAction';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { singleList } = useSelector((state) => state.todo);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    priority: '',
    todos: [],
  });

  console.log(formData,"$$$$$");

  useEffect(() => {
    if (!singleList || !Array.isArray(singleList.todos)) {
      navigate(`todo-details/${id}`);
    }
    if (singleList && Array.isArray(singleList.todos)) {
      setFormData({
        name: singleList.name || '',
        date: singleList.date || '',
        priority: singleList.priority || '',
        todos: [...singleList.todos],
      });
    } else {
      setFormData({
        name: singleList.name || '',
        date: singleList.date || '',
        priority: singleList.priority || '',
        todos: [],
      });
    }
  }, [singleList, navigate, id]);

  const handleChange = (e, todoId) => {
    const { name, value } = e.target;
    const updatedTodos = formData.todos.map((todo) =>
      todo.id === todoId ? { ...todo, [name]: value } : todo
    );
    setFormData({ ...formData, todos: updatedTodos });
  };

  const handleAddTodo = () => {
    const newTodoId = formData.todos.length + 1;
    const newTodo = { id: newTodoId, status: 'pending', todo: '' };

    // Dispatch an action to update the database
    dispatch(addTodo(id, { todos: [...formData.todos, newTodo] }));

    // Update the local state to reflect the change
    setFormData({
      ...formData,
      todos: [...formData.todos, newTodo],
    });
  };

  const handleDeleteTodo = (todoId) => {
    const updatedTodos = formData.todos.filter((todo) => todo.id !== todoId);
    setFormData({ ...formData, todos: updatedTodos });
  };

  const handleDropdown = (e) => {
    setFormData({ ...formData, priority: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTodo(id, formData));
    navigate(`/todo-details/${id}`);
  };


  return (

    <div className="flex pt-20 justify-center h-screen w-screen bg-purple-700">
    <div className=" scrollbar bg-customColor overflow-y-scroll max-h-[80%] p-8 rounded w-[90%]  md:w-[80%] lg:w-6/12 shadow-md">
      <h1 className="text-3xl text-white  font-bold mb-4">Update Todo</h1>
        <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
              <label htmlFor="name" className="block text-white font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="date" className="block text-white font-bold mb-2">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>

            <div className="mb-4">
            <label htmlFor="date" className="block text-white font-bold mb-2">
            Priority:
              </label>
            <select
                  name="Priority"
                  value={formData.priority}
                  onChange={handleDropdown}
                  className="w-full bg-white text-black px-4 py-2 rounded hover:bg-white "
                  required
                >
                  <option value="" disabled>Priority</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="todos"
                className="block text-white font-bold mb-2"
              >
                Todos:
              </label>
              {formData.todos.map((todo, index) => (
                <div key={todo.id} className="flex mb-2">
                  <input
                    type="text"
                    name="todo"
                    value={todo.todo}
                    placeholder="Enter Todo"
                    onChange={(e) => handleChange(e, todo.id)}
                    className="flex-1 px-3 py-2 border rounded"
                    required
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
              <div className="flex">
                <button
                  type="button"
                  onClick={handleAddTodo}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Todo
                </button>

             
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Submit Todo
            </button>
        </form>
      </div>
      </div>
  );
};

export default Update;
