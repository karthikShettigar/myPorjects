import axios from "axios"

const getTasksSuccess = (tasks) => { return { type: "GET_TASKS_SUCCESS", payload: tasks } }
const getTasksFail = (error) => { return { type: "GET_TASKS_FAIL", payload: error } }


export const fetchTasks = () => {
    return (dispatch) => {
            let url = "http://localhost:4000/tasks";
        axios.get(url)
            .then((res) => {
                // console.log(res.data);
                const tasks = res.data;
                dispatch(getTasksSuccess(tasks))

            })
            .catch(error => {
                const errorMessage = error.message;
                // console.log(error.message);
                dispatch(getTasksFail(errorMessage))
            })
    }
}

// export const addTask = (newTask) => {
//     return (dispatch) => {
//         let newData = { name: newTask };
//         axios.post("http://localhost:4000/tasks", newData)
//             .then( fetchTasks() )
//             .catch(error => {
//                 const errorMessage = error.data;
//                 dispatch(getTasksFail(errorMessage))
//             })
//     }
// }