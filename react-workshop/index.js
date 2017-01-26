import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { Alert, Grid, Row, Col, ListGroup, ListGroupItem, Pager } from 'react-bootstrap';

const tasks = [
    {
        id: 1,
        name: 'Name 1',
        desk: 'To Do',
        hours: 1
    },
    {
        id: 2,
        name: 'Name 2',
        desk: 'In Progress',
        hours: 2
    },
    {
        id: 3,
        name: 'Name 3',
        desk: 'Testing',
        hours: 3
    },
    {
        id: 4,
        name: 'Name 4',
        desk: 'Done',
        hours: 4
    },
    {
        id: 5,
        name: 'Name 5',
        desk: 'Done',
        hours: 5
    }
];

const desks = ['To Do', 'In Progress', 'Testing', 'Done'];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tasks };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next(id) {
        const newTasks = tasks.map( (task) => {
            if (task.id === id) {
                var cur = desks.indexOf(task.desk);
                if (cur !== desks.length - 1) {
                    cur++;
                }
                task.desk = desks[cur];
            }
        });
        this.setState(newTasks);
    }

    previous(id) {
        const newTasks = tasks.map( (task) => {
            if (task.id === id) {
                var cur = desks.indexOf(task.desk);
                if (cur !== 0) {
                    cur--;
                }
                task.desk = desks[cur];
            }
        });
        this.setState(newTasks);
    }

    render() {
        return (
            <Grid>
                <h1>My Desk</h1>
                <Row>
                    {desks.map( (desk) =>
                        <OneCol key = {desk}
                                tasks = {this.state.tasks.filter( (task) => task.desk === desk)}
                                next = {this.next}
                                previous = {this.previous}>
                            <Alert bsStyle = 'success'>{desk}</Alert>
                        </OneCol>
                    )}
                </Row>
            </Grid>
        );
    }
}

class OneCol extends React.Component {
    render() {
        return (
            <Col xs={3}>
                {this.props.children}
                {this.props.tasks.map( (task) =>
                    <Task key = {task.id}
                          task = {task}
                          next = {this.props.next}
                          previous = {this.props.previous} />
                )}
            </Col>
        );
    }
}

class Task extends React.Component {
    render() {
        const task = this.props.task;
        return (
            <ListGroup>
                <ListGroupItem>Name: {task.name}</ListGroupItem>
                <ListGroupItem>Hours: {task.hours}</ListGroupItem>
                <ListGroupItem>
                    <Pager>
                        <Pager.Item previous onClick={() => this.props.previous(task.id)}>
                            &larr;
                        </Pager.Item>
                        <Pager.Item next onClick={() => this.props.next(task.id)}>
                            &rarr;
                        </Pager.Item>
                    </Pager>
                </ListGroupItem>
            </ListGroup>
        );
    }
}

ReactDOM.render((
    <App />
  ),
  document.getElementById('app')
);
