# House Rules
## Problem Solved
People forgetting what Chores need to be done, how often they need to be done, and who was supposed to do a specific Chore

This website aims to make it easy for families or roommates to:
- See a list of all Chores
- See who is assigned to a given Chore
- Assign/Unassign a Chore
- Create/Remove/Update a Chore
- Complete a Chore

## Technologies Used
- ReactJS
- JavaScript
- C#
- ASP.NET
- ADO.NET
- PostgreSQL 16
- Entity Framework Core
- AutoMapper
- Bootstrap
- Reactstrap
- CSS3
- HTML5
- Vite

## Installation and Setup Instructions
Clone this repository. You will need the following installed globally on your machine:
- [node](https://github.com/nodejs/node)
- [npm](https://github.com/npm/cli)
- [.Net 8.0.101 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [PostgreSQL 16](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

Then run the following command
```
dotnet tool install --global dotnet-ef --framework net8.0
```
#### Installation
Navigate to the cloned directory and run the following
```
dotnet restore
```
```
dotnet user-secrets init
```
```
dotnet user-secrets set 'HouseRulesDbConnectionString' 'Host=localhost;Port=5432;Username=postgres;Password=<your_postgresql_password>;Database=HouseRules'
```
```
dotnet user-secrets set AdminPassword password
```
```
dotnet ef database update
```
Then navigate to the client directory and run the following
```
npm install
```
#### Run Database
Run the following command in the project root directory
```
dotnet watch run --launch-profile https
```
#### Run Website
Navigate to the client directory and run the following
```
npm run dev
```
