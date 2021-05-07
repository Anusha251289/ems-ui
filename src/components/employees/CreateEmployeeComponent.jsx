import React, { Component } from 'react';
import EmployeeDataService from '../../service/EmployeeDataService';
import './Employee.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: {
                employeeId: '',
                employeeName: '',
                age: '',
                phone: '',
                emailId: ''
            },
            message:null
        }
    }
    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    createEmployee = (event) => {
        event.preventDefault();
        console.log(this.state.Name);
    }

    clearEmployee = () => {
        this.setState({
            employee: {
                employeeId: '',
                employeeName: '',
                age: '',
                phone: '',
                emailId: ''
            }
        })
    }
    onSubmit = (values) => {
        EmployeeDataService.saveEmployee({
            employeeId: values.employeeId,
            employeeName: values.employeeName,
            age: values.age,
            phone: values.phone,
            emailId: values.emailId
        }).then(
            (response) => {
                this.setState({ message: `Employee ${values.employeeId} Created Successfully` })
                this.clearEmployee()
                console.log(response);
            }
        )
    }

    validate = (values) => {
        let errors = {}
        if (!values.employeeId) {
            errors.employeeId = 'Employee Id cannot be empty'
        } else if (values.employeeId && (values.employeeId.toString().length < 5 || values.employeeId.toString().length > 8)) {
            errors.employeeId = 'Minimum length of Employee Id is 5 and Maximum length is 8'
        }

        else if (!values.employeeName) {
            errors.employeeName = 'Employee Name cannot be empty'
        }

        else if (!values.age) {
            errors.age = 'Employee Age cannot be empty'
        } else if (values.age < 18 || values.age > 60) {
            errors.employeeId = 'Employee Age should be greater than 18 and lesser than 60'
        }

        else if (!values.phone) {
            errors.age = 'Employee Phone cannot be empty'
        }
        else if (values.phone && values.phone.length !== 10) {
            errors.phone = 'Enter a valid 10 digit Phone number'
        } else if (isNaN(values.phone)) {
            errors.phone = 'Enter only numeric values for Phone Number'
        }
        else if (!values.emailId){
            errors.emailId = 'Email Id cannot be empty'
        }
        return errors
    }
    render() {
        let { employeeId, employeeName, age, phone, emailId } = this.state
        return (
            <div>
                <h2>Create Employee</h2>
                {this.state.message && <div className="alert alert-warning">{this.state.message}</div>}
                <div className="container">
                    <Formik initialValues={{ employeeId, employeeName, age, phone, emailId }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <div className="box shadow">
                                    <Form>
                                        <ErrorMessage name="employeeId" component="div" className="alert alert-warning" />
                                        <ErrorMessage name="employeeName" component="div" className="alert alert-warning" />
                                        <ErrorMessage name="age" component="div" className="alert alert-warning" />
                                        <ErrorMessage name="phone" component="div" className="alert alert-warning" />
                                        <ErrorMessage name="emailId" component="div" className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label className="header-label required">Employee ID</label>
                                            <Field className="form-control" type="number" name="employeeId"></Field>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="header-label required">Employee Name</label>
                                            <Field className="form-control" type="text" name="employeeName"></Field>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="header-label required">Age</label>
                                            <Field className="form-control" type="number" name="age"></Field>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="header-label required">Phone</label>
                                            <Field className="form-control" type="text" name="phone"></Field>
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label className="header-label required">Email Id</label>
                                            <Field className="form-control" type="text" name="emailId"></Field>
                                        </fieldset>
                                        <button className="btn-btn-success" type="submit">Save</button>
                                    </Form>
                                </div>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent