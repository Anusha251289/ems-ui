import axios from 'axios'

class EmployeeDataService {


    getEmployees() {
        return axios.get('https://emp-management-api.herokuapp.com/api/employees');
        // if (process.env.REACT_APP_ENV === "LOCAL") {
        //     return axios.get('http://localhost:8080/api/employees');
        // }
        // else if (process.env.REACT_APP_ENV === "PROD") {
        //     return axios.get('https://emp-management-api.herokuapp.com/api/employees');
        // }
            
    }

    deleteEmployee(id) {
        return axios.delete(`https://emp-management-api.herokuapp.com/api/employee/${id}`);
        // if (process.env.REACT_APP_ENV === "LOCAL")
        //     return axios.delete(`http://localhost:8080/api/employee/${id}`);
        // else if (process.env.REACT_APP_ENV === "PROD")
        //     return axios.delete(`https://emp-management-api.herokuapp.com/api/employee/${id}`);
        //return axios.delete(`http://localhost:8080/api/employee/${id}`);
    }

    saveEmployee(employee) {
        return axios.post(`https://emp-management-api.herokuapp.com/api/employee`, employee);
        // if (process.env.REACT_APP_ENV === "LOCAL")
        //     return axios.post(`http://localhost:8080/api/employee`, employee);
        // else if (process.env.REACT_APP_ENV === "PROD")
        //     return axios.post(`https://emp-management-api.herokuapp.com/api/employee`, employee);
        //return axios.post(`http://localhost:8080/api/employee`,employee);
    }
}

export default new EmployeeDataService()