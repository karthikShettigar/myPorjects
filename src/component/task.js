
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { fetchTasks } from "../action";
import "bootstrap/dist/css/bootstrap.min.css";
import { Checkbox, TableHead } from "@mui/material";
import { Button } from "react-bootstrap";


function Task({ taskData, fetchTasks }) {
    // console.log(taskData);
    // let data = { taskData, fetchTasks };
    // console.log(taskData);
    const [addFlag, setAddFlag] = useState(false);
    // const [flag, setFlag] = useState(false);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    // const [textStyle, setTextStyle] = useState('none');
    // const [clickTd, setClickTd] = useState(null);
    const [checked, setChecked] = useState([]);
    let tasks = taskData.tasks;
    let errorMessage = taskData.error;
    // console.log(tasks)
    useEffect(() => {
        fetchTasks()
    }, [name, fetchTasks]);

    // console.log(name)
    function handleSubmit(e) {
        e.preventDefault();
        setSuccess("");
        if (name === "") {
            setMessage("Please enter some values");
        } else {
            setMessage("");
            setAddFlag(false);
            let newData = { name: name };
            axios.post("http://localhost:4000/tasks", newData)
                .then(fetchTasks());
            setName("");

        }

    }
    const deleteEmployee = (prop) => {
        setSuccess("")
        let taskId = parseInt(prop);
        axios.delete("http://localhost:4000/tasks/" + taskId)
            .then((res) => {
                fetchTasks();
            })

    }
    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };


    return (
        <Fragment>
            <div className="App">
                <header className="App-header">
                    <h1>TO DO LIST</h1>
                    {errorMessage && <h1> {errorMessage}</h1>}

                    <table >
                        {tasks.length > 0 &&
                            <TableHead>
                                <tr><th>No</th><th>Task</th><th>Tick</th><th>Del</th></tr>
                            </TableHead>}
                        <tbody>
                            {tasks.length > 0 ? (
                                tasks.map((tasks, i) => {
                                    return (

                                        <tr key={i}>
                                            <td >{tasks.id}</td>
                                            {/* <td className={clickTd === i ? "td-clicked" : "td"} key={i}>{tasks.name}</td> */}
                                            <td className={isChecked(tasks.name)}>{tasks.name}</td>
                                            <td>
                                                {/* <Checkbox onClick={() => { setClickTd(i) }}> </Checkbox> */}
                                                <Checkbox value={tasks.name} onChange={handleCheck} > </Checkbox>
                                                {/* <input value={tasks.name} type="checkbox" onChange={handleCheck} /> */}
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={() => deleteEmployee(tasks.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr ><td colSpan={4}>No Data Found</td></tr>
                            )}
                        </tbody>
                    </table>

                    <button onClick={() => setAddFlag(!addFlag)} className="btn btn-primary">
                        Add Task
                    </button>
                    <br />
                    <div className="text-success">{success}</div>
                    {addFlag ? (
                        <form>
                            Taskname:{" "}
                            <input type="text" value={name} onChange={(e) => { setName(e.target.value); setMessage(""); }} /> &nbsp;
                            <Button className="btn btn-primary" onClick={handleSubmit}>
                                Add
                            </Button>
                            <div className="text-danger">{message}</div>
                        </form>
                    ) : null}

                </header>
            </div>
        </Fragment>
    );
}

const mapState = (state) => {
    return {
        taskData: state.tasksReducer
    }
}
const mapDispatch = (dispatch) => {
    return {
        fetchTasks: () => dispatch(fetchTasks())
    }

}

export default connect(mapState, mapDispatch)(Task);
