// Your code here

function createEmployeeRecord(array) {
  return {
    'firstName': array[0],
    'familyName': array[1],
    'title': array[2],
    'payPerHour': array[3],
    'timeInEvents': [],
    'timeOutEvents': []
  }
}

function createEmployeeRecords(arrayOfEmployees) {
  let result = []
  for(const employee of arrayOfEmployees) {
    result.push({
      'firstName': employee[0],
      'familyName': employee[1],
      'title': employee[2],
      'payPerHour': employee[3],
      'timeInEvents': [],
      'timeOutEvents': []
    })
  }
  return result;
}

function createTimeInEvent(employee, timeStamp) {
  employee.timeInEvents.push({
    'type': 'TimeIn',
    'date': timeStamp.split(' ')[0],
    'hour': parseInt(timeStamp.split(' ')[1])
  })
  return employee;
}

function createTimeOutEvent(employee, timeStamp) {
  employee.timeOutEvents.push({
    'type': 'TimeOut',
    'date': timeStamp.split(' ')[0],
    'hour': parseInt(timeStamp.split(' ')[1])
  })
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let hoursWorked = 0;
  let timeIn = employee.timeInEvents.find(element => element.date === date)
  let timeOut = employee.timeOutEvents.find(element => element.date === date)
  hoursWorked = (timeOut.hour - timeIn.hour) / 100 
  return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  const rate = employee.payPerHour;
  return rate * hoursWorked;
}

function allWagesFor(employee){
  const sumTimeIn = employee.timeInEvents.reduce((a, current) => a + current.hour, 0)
  const sumTimeOut = employee.timeOutEvents.reduce((a, current) => a + current.hour, 0)
  const totalHours = (sumTimeOut - sumTimeIn) / 100;
  return totalHours * employee.payPerHour
}

function calculatePayroll(arrayOfEmployees) {
  let total = 0;
  arrayOfEmployees.forEach(element => total += allWagesFor(element))
  return total;
}

function findEmployeeByFirstName(db, firstName) {
  const result = db.find(element => element.firstName === firstName)
  return result;
}