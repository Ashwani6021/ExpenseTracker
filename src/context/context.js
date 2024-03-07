import React, { useReducer, createContext } from "react";
import contextReducer from "./contextReducer";
import axios from "axios";
const initialState = JSON.parse(localStorage.getItem("transactions")) || [];
export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  //Action Creators
  // get transactions
  const getTransaction = async () => {
    try {
      let data;
      try {
        await axios
          .get(`https://expence-tracker-server-7yjt.onrender.com/api/trans`)
          .then((res) => {
            data = res.data;
            console.log(data);
            dispatch({
              type: "GET_TRANSACTIONS",
              payload: data.data,
            });
          });
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //delete transaction
  const deleteTransaction = async (id) => {
    try {
      // try {
      //   await axios.delete(`http://localhost:5000/${id}`).then((res) => {
      //     console.log("success");
      //   });
      // } catch (error) {
      //   console.log(error);
      // }

      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  //   addTransaction
  const addTransaction = async (transaction) => {
    try {
      const res = await axios.post(
        `https://expence-tracker-server-7yjt.onrender.com/api/trans/`,
        transaction
      );

      dispatch({ type: "ADD_TRANSACTION", payload: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };

  const balance = transactions.reduce(
    (acc, currVal) =>
      currVal.type === "Expense" ? acc - currVal.amount : acc + currVal.amount,
    0
  );

  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        getTransaction,
        deleteTransaction,
        addTransaction,
        balance,
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};
