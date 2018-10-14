import React from 'react';
import {Todo} from './Todo'

export class TodoList extends React.Component {
    render() {
        console.log("todoList es:", this.props.todoList);
        const todoList = this.props.todoList.map((todo, i) => {
            return (
                <Todo key={i} text={todo.text} priority={todo.priority} dueDate={todo.duedate}/>
            );
        });

        return (
            <table>
              <thead>
                <tr>
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
