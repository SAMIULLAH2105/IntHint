import { createContext } from "react"
import { useReducer } from "react"

const intialState = {
  isAuth: false,
  // user: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
      }
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
      }
    default:
      return state
  }
}

export const storeContext = createContext()


export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState)

  return (
    <storeContext.Provider value={{ state, dispatch }}>
      {children}
    </storeContext.Provider>
  )
}