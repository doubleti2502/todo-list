import React, {useEffect, useState} from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';

function App(){
    const [tasks, setTasks] = useState([]);
    const [isDisplayForm, setIsDisplayForm] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [itemEditing, setItemEditing] = useState(null)
    const [filterName, setFilterName] = useState('')
    const [filterStatus, setFilterStatus] = useState('-1')
    const [sortBy, setSortBy] = useState('name')
    const [sortValue, setSortValue] = useState('1')

    useEffect(() => {
        setTasks(JSON.parse(localStorage.getItem('tasks') || []))
    },[])

    const s4 = () => {
        return  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    const guid = () => {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    const findIndex = (id) => {
        let result = -1;
        tasks.forEach((task, index) => {
            if(task.id === id){
                result = index;
            }
        });
        return result;
    }


    const onUpdateStatus = (id) => {
        const index = findIndex(id);
        const updatedTask = [...tasks]
        updatedTask[index].status = !tasks[index].status;
        setTasks(updatedTask)
        localStorage.setItem('tasks', JSON.stringify(updatedTask));
    }

    const onHandleSave = (data) => {
        data.status = data.status === 'true';
        const updatedTask = [...tasks]
        if(data.id === ''){
            data.id = guid();
            updatedTask.push(data);
        }else{
            const index = findIndex(data.id);
            updatedTask[index] = data;
        }
        setTasks(updatedTask)
        localStorage.setItem('tasks', JSON.stringify(updatedTask));
    }


    const onToggleForm = () => {
        if(itemEditing !== null){
            setItemEditing(null)
        }else{
           setIsDisplayForm(prevState => !prevState)
        }
    }

    const onExitForm = () =>{
        setIsDisplayForm(false)
        setItemEditing(null)
    }

    const onDeleteTask = (id) => {
        const updatedTasks = [...tasks]
        const index = findIndex(id);
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        onExitForm();
    }

    const onSearch = (newKeyword) => {
        setKeyword(newKeyword)
    }

    const onFilter = (newFilterName, newFilterStatus) => {
        setFilterName(newFilterName)
        setFilterStatus(newFilterStatus)
    }

    const onSelectedItem = (item) => {
        setItemEditing(item)
        setIsDisplayForm(true)
    }


    const onSort = (newSortBy, newSortValue) => {
        setSortBy(newSortBy)
        setSortValue(newSortValue)
    }

    const filterTasks = (todoTasks) => {
        todoTasks = todoTasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });

        if(filterName){
            todoTasks = todoTasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
            });
        }
        if(filterStatus){
            todoTasks = todoTasks.filter((task) => {
                if(filterStatus === '-1' || filterStatus === -1){
                    return task;
                }else{
                    return task.status === (parseInt(filterStatus, 10) === 1);
                }
            });
        }
        if(sortBy === 'name'){
            todoTasks.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        }else{
            todoTasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
        }

        return todoTasks
    }


    return(
        <div className="container">
            <div className="text-center">
                <h1>Quản Lý Công Việc</h1><hr/>
            </div>
            <div className="row">
                <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : '' }>
                    { isDisplayForm === true ? <TaskForm
                        onSave={onHandleSave}
                        onExitForm={onExitForm}
                        itemEditing={ itemEditing }
                    /> : '' }
                </div>
                <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                    <button type="button" className="btn btn-primary" onClick={onToggleForm} >
                        <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                    </button>
                    <TaskControl
                        onSearch={onSearch}
                        onSort={onSort}
                        sortBy={sortBy}
                        sortValue={sortValue}
                    />
                    <TaskList
                        tasks={filterTasks(tasks)}
                        onUpdateStatus={onUpdateStatus}
                        onDeleteTask={onDeleteTask}
                        filterName={filterName}
                        filterStatus={filterStatus}
                        onFilter={onFilter}
                        onSelectedItem={onSelectedItem}
                    />
                </div>
            </div>
        </div>

    )

}




export default App;
