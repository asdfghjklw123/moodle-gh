import React, { useEffect, useState } from 'react';
import Task from './task';
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import { GetCourseByIdTC } from '../../store/reducers/taskReducers';
import Taskk from './taskk';

const TaskContainer = (props) => {
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const taskId = parseInt(pathArray[pathArray.length - 1], 10);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.GetCourseByIdTC(taskId)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [taskId]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Taskk course={props.course} />
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    course: state.course,
});

export const TaskConnected = connect(mapStateToProps, { GetCourseByIdTC })(TaskContainer);
