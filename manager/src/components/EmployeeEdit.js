import _ from 'lodash';
import React, { Component } from "react";
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm'

class EmployeeEdit extends Component {
    state = { showModal: false };

    componentWillMount(){
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value })
        })
    }

    onSavePress(){
        const { name, phone, shift } = this.props;
        const { uid } = this.props.employee;

        this.props.employeeSave({ uid, name, phone, shift });
    }

    onTextPress(){
        const { phone, shift } = this.props;

        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept(){
        this.props.employeeDelete(this.props.employee);
    }

    onDecline(){
        this.setState({ showModal: false });
    }

    render(){
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onSavePress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button onPress={() => {
                            this.setState({ showModal: !this.state.showModal }
                        )}}>
                        Fire Employee
                    </Button>
                </CardSection>


                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, {
    employeeUpdate, employeeSave, employeeDelete
})(EmployeeEdit)
