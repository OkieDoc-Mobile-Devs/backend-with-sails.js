require("dotenv").config();

let employees = [
    {employeeId: 'EMP1', firstName: "John", lastName: "Doe", managerId: "MGR1" },
    {employeeId: 'EMP2', firstName: "Jane", lastName: "Smith", managerId: "MGR2" },
    {employeeId: 'EMP3', firstName: "Bob", lastName: "Johnson", managerId: "MGR3" },
    {employeeId: 'EMP4', firstName: "Alice", lastName: "Brown", managerId: "MGR5" },
    {employeeId: 'EMP5', firstName: "Charlie", lastName: "Davis", managerId: "MGR5" },
]

let managers = [
    {managerId: "MGR1", firstName: "Alice", lastName: "Brown" },
    {managerId: "MGR2", firstName: "Charlie", lastName: "Davis" },
    {managerId: "MGR3", firstName: "Eve", lastName: "Wilson" },
    {managerId: "MGR4", firstName: "Lars", lastName: "James" },
]
 let departments = [
    {departmentId: "DEP1", managerId: "MGR1", name: "Sales" },
    {departmentId: "DEP2", managerId: "MGR2", name: "Marketing" },
    {departmentId: "DEP3", managerId: "MGR1", name: "Engineering" },
    {departmentId: "DEP4", managerId: "MGR3", name: "HR" },
]

module.exports = {
    getAllEmployees: function (req,res){
        return res.json(employees);
    },

    getAllEmployeesById: function (req, res){
        // get the employees id
        let foundEmployee = employees.find((employee)=>{
            return employee.employeeId === req.params.employeeId
        })
        return res.json(foundEmployee)
    },

    getAllEmployeesByManager: function (req, res){
        // get the manager id
        let foundManager = managers.find((manager)=>{
            return manager.managerId === (req.params.managerId)
        });
        // make an empty array that will hold the employees under the manager
        let employeesUnderManager = []

        // let employeesUnderManager = employees.filter((employee)=>{
        //     return employee.managerId === foundManager.managerId
        // })

        //traverse the employees array
        for (employee of employees){
            //check if the manager id param matches the managerid in the employees array
            if (employee.managerId === foundManager.managerId){ 
                //if it does, then push the employee into the employees under manager array
                employeesUnderManager.push(employee);
            }
        }
        return res.json(employeesUnderManager);
    },

    addEmployee: function (req, res) {
        //add new entry into the database
        employees.push(req.body)

        res.json(req.body);
    },

    mapAllEmployeesPerManager: function (req, res) {
        // create an empty array that you will push to
        let allEmployeeAndManager = []

        // traverse the employee array
        for (manager of managers) {
            // check and filter if manager matchers the employee's manager
            let mappedEmployeesPerManager = employees.filter((employee)=>{
                return employee.managerId === manager.managerId
            })
            // consolidate the matching manager into a new array

            allEmployeeAndManager.push(mappedEmployeesPerManager)
        }
        // send a response
        res.status(200).json(allEmployeeAndManager)
    },

    updateEmployee: function (req, res) {
        //get the employee id from the params(url)
        let foundEmployee = employees.find((employee)=>{
            return employee.employeeId === req.params.employeeId
        })

        //if employee exists
        let employeeIndex = employees.indexOf(foundEmployee);

        //update the employee details with the request body
        employees[employeeIndex] = {...employees[employeeIndex], ...req.body};
        return res.json(employees);
    },
    deleteEmployee: function (req, res) {
        //get the employee id from the params(url)
        let foundEmployee = employees.find((employee)=>{
            return employee.employeeId === req.params.employeeId
        })

        //if employee exists
        let employeeIndex = employees.indexOf(foundEmployee)

        //delete the employee from the database 
        let deletedEmployee = employees.splice(employeeIndex, + 1);
        return res.json(deletedEmployee)
    }, 
    getAllEmployeeManagerDepartment: function (req, res) {
    
    let mappedData = managers.map(manager => {
        
        let department = departments.find(dept => dept.managerId === manager.managerId);

        let employeesUnderManager = employees.filter(emp => emp.managerId === manager.managerId);

        return {
            managerName: manager.name,
            departmentName: department ? department.name : "No Department Assigned",
            departmentId: department ? department.departmentId : null,
            totalEmployees: employeesUnderManager.length,
            employees: employeesUnderManager
        };
    });

    res.status(200).json(mappedData);
}
    };


