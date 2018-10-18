import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component {
    render() {
        console.log("todoList es:", this.props.todoList);
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} text={todo.description} priority={todo.priority} dueDate={todo.dueDate} fileUrl={todo.fileUrl}/>
            );
        });

        return (
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Task</th>
                  <th>Priority</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {todoList}
              </tbody>
            </table>
        );

    }

}
