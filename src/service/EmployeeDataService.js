import axios from 'axios'

class EmployeeDataService {

    getEmployees() {
        return axios.get('http://localhost:8080/api/employees');
    }

    deleteEmployee(id) {
        return axios.delete(`http://localhost:8080/api/employee/${id}`);
    }

    saveEmployee(employee) {
        return axios.post(`http://localhost:8080/api/employee`,employee);
    }
}

export default new EmployeeDataService()