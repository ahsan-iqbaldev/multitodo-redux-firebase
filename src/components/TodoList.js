import React, { useState } from "react";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Badge } from "keep-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const TodoList = ({ todos, onEdit, onDelete }) => {
  const [expandedTodoId, setExpandedTodoId] = useState(null);
  const [truncateText, setTruncateText] = useState(true);
  const [radioButtonChecked, setRadioButtonChecked] = useState(false);
  const [taskCompleted, settaskCompleted] = useState("");
  const navigate = useNavigate();

  const handleRadioChange = (id) => {
    setRadioButtonChecked((prev) => !prev);
  };

  const handleEyeButtonClick = (id) => {
    navigate(`/todo-details/${id}`);
  };
  return (
    <ul className="divide-y divide-gray-200">
      {todos?.map((todo) => (
        <React.Fragment key={todo.id}>
          <li className="p-4 flex items-center justify-between  rounded-xl m-3 bg-purple-700">
            <div className="flex items-center">
              <div className="flex flex-col bg-transparent focus:outline-none">
                <h3 className="text-white">
                  <span className="mr-1">#{todo?.priority}</span>
                  <span className="text-xl text-white font-semibold break-all mr-1">
                    {todo.name}
                  </span>

                  <span className="text-sm">
                    (
                    {
                      todo.todos.filter((item) => item.status === "completed")
                        .length
                    }
                    /{todo.todos.length})
                  </span>
                </h3>

                <div className="flex text-white ms-2 text-base">
                 <span className="">{todo?.date}</span>
                  <span className="ms-2 ">
                    {todo.todos.filter((item) => item.status === "completed")
                      .length === todo.todos.length ? (
                      <Badge colorType="light" color={"success"} dot={false}>
                        Completed
                      </Badge>
                    ) : (
                      <Badge colorType="light" color={"danger"} dot={false}>
                        (Pending)
                      </Badge>
                    )}
                    <Badge
                      colorType="light"
                      color={todo.status === "completed" ? "success" : "danger"}
                      dot={false}
                    ></Badge>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleEyeButtonClick(todo.id)}
                className=" p-1 md:p-2 text-white rounded-full"
              >
                <FaEye size={28} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className=" p-1 md:p-2 text-white rounded-full"
              >
                <MdDeleteForever size={28} />
              </button>
            </div>
          </li>
          {expandedTodoId === todo.id && (
            <div className="dropdown">
              {" "}
              <li
                key={todo.id}
                className="p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="todoRadio"
                    onChange={() => handleRadioChange(todo.id)}
                  />
                  <div className="flex flex-col ms-2 bg-transparent focus:outline-none">
                    <h3
                      className={`text-sl font-semibold ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-black"
                      } ${
                        truncateText && !radioButtonChecked ? "truncate" : ""
                      }`}
                    >
                      {todo.name}
                    </h3>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => onEdit(todo.id)}
                    className="mx-2 p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="mx-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                  >
                    <MdDeleteForever size={24} />
                  </button>
                </div>
              </li>
            </div>
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default TodoList;
