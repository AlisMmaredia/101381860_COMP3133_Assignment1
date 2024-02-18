// ALIS MAREDIA - 101381860

const Employee = require('../models/employee');

const employeeResolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error('Failed to fetch employees');
      }
    },
    getEmployeeById: async (_, { eid }) => {
      try {
        const employee = await Employee.findById(eid);
        if (!employee) {
          throw new Error('Employee not found');
        }
        return employee;
      } catch (error) {
        throw new Error('Failed to fetch employee');
      }
    }
  },
  Mutation: {
    addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      try {
        const newEmployee = await Employee.create({ first_name, last_name, email, gender, salary });
        return newEmployee;
      } catch (error) {
        throw new Error('Failed to add employee');
      }
    },
    updateEmployeeById: async (_, { eid, first_name, last_name, email, gender, salary }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, salary }, { new: true });
        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }
        return updatedEmployee;
      } catch (error) {
        throw new Error('Failed to update employee');
      }
    },
    deleteEmployeeById: async (_, { eid }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
          throw new Error('Employee not found');
        }
        return deletedEmployee;
      } catch (error) {
        throw new Error('Failed to delete employee');
      }
    }
  }
};

module.exports = employeeResolvers;
