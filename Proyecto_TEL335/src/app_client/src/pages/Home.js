import { useEffect } from "react"
import { useExercisesContext } from "../hooks/useExercisesContext"
import Axios from "axios";
// components
import ExercisesDetails from "../components/exercisesDetails"
import { useAuthContext } from "../hooks/useAuthContext"; 
const Home = () => {
  const { exercises, dispatch } = useExercisesContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const getExercises = async () =>{
        try{
            const response = await Axios.get("http://localhost:3001/exercise", {headers: {'Authorization': `Bearer ${user.token}`}})
            const { data } = response
            dispatch({type: 'SET_EXERCISE', payload: data})
        }catch (error){
            console.error('Error fetching exercises:', error)
        }
    }

    if(user){
      getExercises()
    }

  }, [dispatch, user])

  return (
    <div className="home">
      {user &&(
        <div className="exercises">
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th className="table-header">Usuario</th>
            <th className="table-header">Ejercicio</th>
            <th className="table-header">Cantidad de repeticiones</th>
            <th className="table-header">Fecha</th>
            <th className="table-header">Descripción</th>
            </tr>
          </thead>
          {exercises && exercises.map(exercise => (
            <ExercisesDetails exercise={exercise} key={exercise._id} />
          ))}
        </table>
      </div>
      )}

    </div>
  )
}

export default Home