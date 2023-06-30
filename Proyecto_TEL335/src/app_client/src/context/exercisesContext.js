import { createContext, useReducer } from 'react'

export const ExercisesContext = createContext()

export const exercisesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXERCISE':
      return { 
        exercises: action.payload 
      }
    default:
      return state
  }
}

export const ExercisesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exercisesReducer, { 
    exercises: null
  })
  
  return (
    <ExercisesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ExercisesContext.Provider>
  )
}