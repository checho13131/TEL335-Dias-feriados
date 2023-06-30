import { useAuthContext } from "../hooks/useAuthContext"

const ExercisesDetails = ({ exercise }) => {
    const { user } = useAuthContext();
    console.log(user)
    return (
        <tbody>
            <tr key={exercise.id}>
                <td>{user.email}</td>
                <td>{exercise.type}</td>
                <td>{exercise.total}</td>
                <td>{exercise.date}</td>
                <td>{exercise.description}</td>
            </tr>

        </tbody>

       
    )
}

export default ExercisesDetails