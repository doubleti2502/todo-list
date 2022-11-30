import React from 'react';

function TaskItem(props) {

    const onUpdateStatus = () => {
        props.onUpdateStatus(props.task.id);
    }

    const onDeleteItem = () => {
        props.onDeleteTask(props.task.id);
    }

    const onSelectedItem = () => {
        props.onSelectedItem(props.task);
    }

    const showStatusElement = () =>{
        return (
            <span
                className={ props.task.status ? 'label label-danger' : 'label label-info' }
                onClick={ onUpdateStatus }
            >{ props.task.status === true ? 'Kích Hoạt' : 'Ẩn' }</span>
        );
    }


    return (
        <tr>
            <td>{ props.index }</td>
            <td>{ props.task.name }</td>
            <td className="text-center">
                { showStatusElement() }
            </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={ onSelectedItem }>
                    <span className="fa fa-pencil mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={ onDeleteItem }>
                    <span className="fa fa-trash mr-5"></span>Xóa
                </button>
            </td>
        </tr>
    );
}

export default TaskItem;
