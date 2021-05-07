import React, { Component } from 'react';
import EmployeeDataService from '../../service/EmployeeDataService';
import CreateEmployeeComponent from './CreateEmployeeComponent'
import FooterComponent from './FooterComponent'
import './Employee.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class EmployeeComponent extends Component {
    render() {
        return (
            <div className="EmployeeApp">
                <Router>
                    <HeaderComponent></HeaderComponent>
                    <Switch>
                        <Route path="/" exact component={CreateEmployeeComponent}/>
                        <Route path="/create" component={CreateEmployeeComponent}/>
                        <Route path="/view" component={ViewEmployeeDetailsComponent} />
                        <Route path="" component={ErrorComponent} />
                    </Switch>
                    {/*<FooterComponent></FooterComponent>*/}
                </Router>
            </div>
        )
    }
}

function ErrorComponent(){
    return <div>An Error Occured! Invalid URI!!</div>
}
class ViewEmployeeDetailsComponent extends Component{   
    constructor(props) {
        super(props)
        this.state = {
            employee: [
                    {
                        employeeId: '',
                        employeeName: '',
                        age: '',
                        phone: '',
                        emailId: ''
                    }
        ],
            message: null
        }

    }
    componentDidMount(){
        EmployeeDataService.getEmployees()
            .then(response => {
                console.log("response", response)
                let employee = response.data;
                this.setState({ employee: employee})
            })
    }

    deleteEmployeeClicked = (employee) => {
        if(window.confirm("Are you sure you want to delete "+ employee.employeeName+"?")) {
            EmployeeDataService.deleteEmployee(employee.employeeId)
                .then(response => {
                    this.setState({ message: `Delete of Employee ${employee.employeeId} Successful`})
                    this.setState({ employee: response.data })
                })
        }
        
    }
    render() {
        return (
            <div>
                <div className="header">Employee Details</div>
                {this.state.message && <div className="alert alert-warning">{this.state.message}</div>}
                <div className="container-wrapper box box-view shadow">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Age</th>
                            <th>Phone No</th>
                            <th>Email ID</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.employee.map(
                                emp =>
                                    <tr>
                                        <td>{emp.employeeId}</td>
                                        <td>{emp.employeeName}</td>
                                        <td>{emp.age}</td>
                                        <td>{emp.phone}</td>
                                        <td>{emp.emailId}</td>
                                        <td><button className="btn-btn-warning" onClick={() => this.deleteEmployeeClicked(emp)}>Delete</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
            </div>
            
        )
    }
}
class HeaderComponent extends Component{
    render(){
        return(
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="top-header">Employee Management</div>
                    <div className="menu">
                        <div><Link className="nav-link" to="/create">Create Employee</Link></div>
                        <div><Link className="nav-link" to="/view">View Employees</Link></div>
                    </div>
                </nav>
            </header>
        )
    }
}



export default EmployeeComponent