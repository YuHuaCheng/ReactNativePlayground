import React, { Component } from "react";
import { connect } from 'react-redux';
import { Picker, Text, View } from 'react-native';
import { CardSection, Input } from './common';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {
    render(){
        const { name, phone, shift } = this.props;
        const employeeUpdate = this.props.employeeUpdate;

        return (
            <View>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={ name }
                        onChangeText={ value => employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={ phone }
                        onChangeText={ value => employeeUpdate({ prop: 'phone', value })}
                    />
                </CardSection>

                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={styles.pickerTextStyle}>Shift</Text>
                    <Picker
                        selectedValue={ shift }
                        onValueChange={ value => employeeUpdate({ prop: 'shift', value }) }
                    >
                        {shiftDays.map(text => { return <Picker.Item key={text} label={text} value={text}/> })}
                    </Picker>
                </CardSection>
            </View>
        )
    }
}

const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10
    }
};


const shiftDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
];


const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift }
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);