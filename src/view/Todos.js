import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Badge, Button, Modal, Spinner, Table, Dropdown } from "keep-react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Trash } from "phosphor-react";
import {
  getSingleList,
  deleteTodo,
  updateTodos,
  updateTodoStatus,
} from "../store/actions/todoAction";
import moment from "moment";

const Todos = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleList, isGettingSingleList, isLoading } = useSelector(
    (state) => state.todo
  );
  const [todoDetails, setTodoDetails] = useState({});
  const [todoDelete, setTodoDelete] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showErrorModalX, setShowErrorModalX] = useState(false);

  const handleTodoDetailsChange = (e) => {
    setTodoDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (userId) => {
    dispatch(updateTodos(userId, todoDetails?.id, todoDetails?.todo));
    setShowModal(false);
  };

  const handleEdits = () => {
    setShowModal(false);
  };

  const handleDelete = (userId) => {
    dispatch(deleteTodo(userId, todoDelete?.id));
    setShowErrorModalX(false);
  };

  const handleDeletes = () => {
    setShowErrorModalX(false);
  };

  const handleMoveStatus = (todoId, currentStatus) => {
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    dispatch(updateTodoStatus(id, todoId, newStatus));
  };

  useEffect(() => {
    dispatch(getSingleList(id));
  }, [id]);

  return (
    <>
      <div className="flex pt-20 justify-center h-screen w-screen bg-purple-700">
        <div className="scrollbar bg-customColor overflow-y-scroll max-h-[80%] p-8 w-[90%] md:w-3/4 lg:w-1/2 xl:w-[90%] shadow-md">
          {isGettingSingleList ? (
            <div className="flex p-5  justify-center w-100">
              <Spinner color="info" size="xl" />
            </div>
          ) : (
            <>
              <div className="flex justify-between">
                <h1 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4">
                  {singleList?.name}
                  <span className="text-lg mx-1">
                    (#{singleList?.priority})
                  </span>
                </h1>
                <span className="text-white mr-0 md:mr-10">
                  {moment
                    .unix(singleList?.createdAt?.seconds)
                    .format("MMMM D, YYYY")}
                </span>
              </div>
              <Table className="table-fixed">
                <Table.Head className="bg-purple-700 w-full">
                  <Table.HeadCell className="text-white">
                    Todo ID
                  </Table.HeadCell>
                  <Table.HeadCell className="text-white">Todo</Table.HeadCell>
                  <Table.HeadCell className="text-white">Status</Table.HeadCell>
                  <Table.HeadCell className="text-white">
                    Actions
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {singleList?.todos?.map((todo) => (
                    <Table.Row key={todo.id} className="text-white">
                      <Table.Cell>{todo.id}</Table.Cell>
                      <Table.Cell>{todo.todo}</Table.Cell>
                      <Table.Cell>
                        <Badge
                          colorType="light"
                          color={
                            todo.status === "completed" ? "success" : "danger"
                          }
                          dot={false}
                        >
                          {todo.status}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell
                        className="scrollbar2"
                        style={{ overflowX: "auto" }}
                      >
                        <Button.Group>
                          <Button
                            size="xs"
                            style={{ whiteSpace: "nowrap" }}
                            className={`bg-blue-500 text-white rounded ${
                              todo.status === "completed"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                            onClick={() =>
                              handleMoveStatus(todo.id, todo.status)
                            }
                          >
                            {todo.status === "completed"
                              ? "To pending"
                              : "To completed"}
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            className="ms-2"
                            disabled={todo.status === "completed"}
                            onClick={() => {
                              setTodoDetails(todo);
                              setShowModal(true);
                            }}
                          >
                            <FaEdit size={20} />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => {
                              setTodoDelete(todo);
                              setShowErrorModalX(true);
                            }}
                            className="ms-2"
                          >
                            <MdDeleteForever size={20} color="red" />
                          </Button>
                        </Button.Group>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <Link
                to={`/edit/${singleList.id}`}
                className="bg-blue-500 text-white mt-10 px-4 py-2 rounded hover:bg-blue-700"
              >
                Add new Todo
              </Link>
            </>
          )}
          {/* Edit Modal */}
          <Modal show={showModal} position="center">
            <Modal.Header className="-mt-5">
              Enter your Updated Todo
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <input
                  type="text"
                  name="todo"
                  value={todoDetails?.todo}
                  onChange={handleTodoDetailsChange}
                  placeholder="Enter your updated todo here"
                  className="border border-gray-300 p-2 w-full"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="outlineGray" onClick={handleEdits}>
                Cancel
              </Button>
              <Button type="primary" onClick={() => handleEdit(id)}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Delete Modal */}
          <Modal
            icon={<Trash size={28} color="#E92215" />}
            size="md"
            show={showErrorModalX}
          >
            <Modal.Header className="mb-3">
              Do you want to delete this file?
            </Modal.Header>
            <Modal.Footer>
              <Button type="outlineGray" onClick={handleDeletes}>
                Cancel
              </Button>
              <Button
                type="primary"
                color="error"
                onClick={() => handleDelete(id)}
              >
                {isLoading ? <Spinner color="info" size="xl" /> : "Delete"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Todos;
