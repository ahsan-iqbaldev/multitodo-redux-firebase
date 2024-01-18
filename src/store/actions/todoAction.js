import firebase from "../../config/firebase";

export const getTodos = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    firebase
      .firestore()
      .collection("todo")
      .orderBy("priority","desc")
      .onSnapshot(async (data) => {
        let tempData = [];
        for (let doc of data.docs) {
          let id = doc.id;
          let data1 = doc.data();
          tempData.push({ id: id, ...data1 });
        }
        dispatch({ type: "GET_USERS", payload: tempData });
        dispatch(setIsLoading(false));
      });
  } catch (error) {
    dispatch(setIsLoading(false));
    alert(error.message);
  }
};

export const setIsLoading = (payload) => async (dispatch) => {
  try {
    dispatch({ type: "SET_IS_LOADING", payload });
  } catch (error) {
    alert(error.message);
  }
};

export const setSingleTodoLoading = (val) => async (dispatch) => {
  dispatch({ type: "SET_SINGLE_TODO_LOADER", payload: val });
};

export const getSingleList = (id) => async (dispatch) => {
  dispatch(setSingleTodoLoading(true));
  const data = firebase
    .firestore()
    .collection("todo")
    .doc(id)
    .onSnapshot(async (query) => {
      if (query.data()) {
        dispatch({
          type: "SET_SINGLE_LIST",
          payload: { id: query.id, ...query.data() },
        });
      }

      dispatch(setSingleTodoLoading(false));
    });
  console.log("firebase", data);
};

export const deleteTodo = (userId, todoId) => {
  console.log(userId, todoId);
  return async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const userRef = firebase.firestore().collection("todo").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const todos = userDoc.data().todos || [];
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);

      await userRef.update({ todos: updatedTodos });

      dispatch({ type: "DELETE_TODO", payload: todoId });
      dispatch(setIsLoading(false));
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error.message);
      dispatch(setIsLoading(false));
    }
  };
};

export const updateTodos = (userId,todoId,currentupdateTodos) => async (dispatch) => {
  console.log('AhsanAhsanAhsan>>>>>>>>>>..',userId, todoId,currentupdateTodos);
  try {
    const userRef = firebase.firestore().collection("todo").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const todos = userDoc.data().todos || [];
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          todo: currentupdateTodos,
        };
      }
      return todo;
    });

    await userRef.update({ todos: updatedTodos });
    console.log("Todo status updated successfully");
  } catch (error) {
    dispatch({
      type: "TODO_UPDATE_ERROR",
      payload: error.message,
    });

    console.error("Error updating todo status:", error.message);
  }
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await firebase.firestore().collection("todo").doc(id).delete();
      dispatch({ type: "DELETE_USER", payload: id });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
};

export const updateTodoStatus =
  (userId, todoId, currentStatus) => async (dispatch) => {
    console.log('updateTodoStatus',userId, todoId, currentStatus);
    try {
      const userRef = firebase.firestore().collection("todo").doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const todos = userDoc.data().todos || [];
      const updatedTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            status: currentStatus,
          };
        }
        return todo;
      });

      await userRef.update({ todos: updatedTodos });
      console.log("Todo status updated successfully");
    } catch (error) {
      dispatch({
        type: "TODO_STATUS_UPDATE_ERROR",
        payload: error.message,
      });

      console.error("Error updating todo status:", error.message);
    }
  };

  export const addUser = (user) => {
    console.log("user>>", user);
    return async (dispatch) => {
      try {
        const userWithTimestamp = {
          ...user,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
  
        const docRef = await firebase
          .firestore()
          .collection("todo")
          .add(userWithTimestamp);
  
        const newUser = { id: docRef.id, ...userWithTimestamp };
  
        dispatch({ type: "ADD_USER", payload: newUser });
      } catch (error) {
        console.error("Error adding user:", error);
  
        dispatch({ type: "ADD_USER_ERROR", payload: error.message });
      }
    };
  };
  export const addTodo = (listId, formData) => {
    console.log("addTodo>>$$$$$", listId, formData);
    return async (dispatch) => {
      try {
        await firebase.firestore().collection('todo').doc(listId).update(formData);
        dispatch({ type: "ADD_TODO_SUCCESS", payload: formData });
      } catch (error) {
        console.error("Error adding todo:", error);
  
        dispatch({ type: "ADD_TODO_ERROR", payload: error.message });
      }
    };
  };
  
