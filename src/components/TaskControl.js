import React  from 'react';
import TaskSearchControl from './TaskSearchControl';
import TaskSortControl from './TaskSortControl';

function TaskControl(props) {
        return (
            <div className="row mt-15">
                <TaskSearchControl onSearch={props.onSearch} />
                <TaskSortControl
                    onSort={props.onSort}
                    sortBy={props.sortBy}
                    sortValue={props.sortValue}
                />
            </div>
        );
}

export default TaskControl;
