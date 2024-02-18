// ALIS MAREDIA - 101381860

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type Query {
    getUser: User
    getAllEmployees: [Employee]
    getEmployeeById(eid: ID!): Employee
    loginUser(username: String!, password: String!): AuthPayload
  }

  type Mutation {
    signupUser(username: String!, email: String!, password: String!): User
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
    updateEmployeeById(eid: ID!, first_name: String!, last_name: String!, email: String!, gender: String!, salary: Float!): Employee
    deleteEmployeeById(eid: ID!): Employee
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
