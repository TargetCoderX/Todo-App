import React, { useState } from 'react';

function TodoItem({ todos, deleteTasks, updateTask }) {
    return (
        <>
            {todos && todos.map((item, index) => (
                <li className={item.is_completed ? `completed bg-success` : ""} key={index}>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="checkbox" type="checkbox" onChange={(e) => updateTask(item.id)} checked={item.is_completed} />{item.task_name} <i className="input-helper"></i>
                        </label>
                    </div>
                    <i className="remove mdi mdi-close-circle-outline" onClick={(e) => { deleteTasks(item.id) }}></i>
                </li>
            ))}
        </>
    );
}

export default TodoItem;
