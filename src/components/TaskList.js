import React, { useState} from 'react';
import TaskItem from './TaskItem';

function TaskList(props) {
    const [filterName, setFilterName] = useState('')
    const [filterStatus, setFilterStatus] = useState(-1)

    const onChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        props.onFilter(name === 'filterName' ? value : filterName, name === 'filterStatus' ? value : filterStatus);
        if (name === 'filterName'){
            setFilterName(value)
        }else {
            setFilterStatus(value)
        }
    }

    return (
        <div className="row mt-15">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName"
                                onChange={ onChange }
                                value={ filterName }
                            />
                        </td>
                        <td>
                            <select
                                className="form-control"
                                name="filterStatus"
                                onChange={ onChange }
                                value={ filterName }
                            >
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    { props.tasks.map((task, index) => {
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                                index={index + 1}
                                onUpdateStatus={ props.onUpdateStatus }
                                onDeleteTask={ props.onDeleteTask }
                                onSelectedItem = { props.onSelectedItem }
                            />
                        )
                    }) }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default TaskList;
