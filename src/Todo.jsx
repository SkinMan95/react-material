import React from 'react';

export class Todo extends React.Component {
    render() {
        console.log(this.props);

        return (
            <tr>
                <td>{this.props.text}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.dueDate}</td>
            </tr>
        );
    }

}