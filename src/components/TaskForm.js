import React, { useEffect, useState} from 'react';

function TaskForm({itemEditing, onSave, onExitForm}) {
    const [currItemEditing, setCurrItemEditing] = useState({
        id : '',
        name : '',
        status : false
    })

    useEffect(() => {
        if (itemEditing && itemEditing.id !== null){
            setCurrItemEditing(itemEditing)
        }else {
            onClear()
        }
    }, [itemEditing])

    const onHandleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        setCurrItemEditing(prev => ({...prev, [name]: value}))
    }

    const onHandleSubmit = (event) => {
        event.preventDefault();
        onSave(currItemEditing);
        onClear();
        onExitForm();
    }

    const onClear = () => {
        setCurrItemEditing({
            id : '',
            name : '',
            status : false
        })
    }

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { !currItemEditing || !currItemEditing.id ? 'Thêm Công Việc' : 'Cập Nhật Công Việc' }
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={onExitForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={onHandleSubmit} >
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={currItemEditing.name}
                                onChange={onHandleChange }
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            value={currItemEditing.status}
                            onChange={onHandleChange}
                            name="status"
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" onClick={ onClear } className="btn btn-danger">
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default TaskForm;
