import _ from 'lodash';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { employeeFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeeFetch();
    }

    renderItem({ item }){
        return <ListItem employee={item}/>
    };

    render() {
        return (
            <FlatList
                data={this.props.employees}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.uid}
            />
        )
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid } // { shift: 'Monday', name: 'Jane', uid: 'blahblah'}
    });

    return { employees }
};

export default connect(mapStateToProps, { employeeFetch })(EmployeeList);