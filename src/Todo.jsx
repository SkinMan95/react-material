import React from 'react';

export class Todo extends React.Component {
    imageTypes = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];

    isImage = (url) => {
        return this.imageTypes.some((e) => {return url.endsWith(e)});
    }

    render() {
        console.log(this.props);

        return (
            <tr>
                <td>{this.isImage(this.props.fileUrl) ? <img src={this.props.fileUrl} alt={this.props.text} /> : <a href={this.props.fileUrl}>Image</a>}</td>
                <td>{this.props.text}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.dueDate}</td>
            </tr>
        );
    }

}