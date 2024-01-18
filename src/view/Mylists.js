import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteUser } from "../store/actions/todoAction"
import { Spinner } from "keep-react";

const Mylists = () => {
  const dispatch = useDispatch();
  const { todo, isLoading } = useSelector((state) => state.todo);

  const handleEdit = (id) => {
    console.log("Edit todo with ID:", id);
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    console.log("Delete todo with ID:", id);
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      <div className="flex pt-20 justify-center h-screen w-screen bg-purple-700 ">
        <div className=" scrollbar bg-customColor overflow-y-scroll max-h-[90%] p-2 md:p-8 rounded w-[90%] sm:w-[80%] lg:w-6/12 shadow-md l ">
          <h1 className="text-3xl mt-4 md:mt-1 ms-3 text-white font-bold mb-4">My Todo List</h1>
          {isLoading && (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner color="info" size="xl" />
            </div>
          )}

          <TodoList
            todos={todo}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // onToggle={handleToggle}
          />
        </div>
      </div>
    </>
  );
};

export default Mylists;
