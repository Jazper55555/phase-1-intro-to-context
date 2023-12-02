/* Create function w/ 4 arguments
Create a newObject w/ 6 keys
Initialize empty arrays for last 2 keys (time in/out)
*/
function createEmployeeRecord(array) {
    let newEmployee = {}
    newEmployee.firstName = array[0]
    newEmployee.familyName = array[1]
    newEmployee.title = array[2]
    newEmployee.payPerHour = array[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []
    return newEmployee
}

/* Create function w/ array as argument
Create newArray that houses nested arrays from newEmployee into a new array
*/
function createEmployeeRecords(arrayOfArrays) {
    let employeeRecords = []
    arrayOfArrays.forEach((array) => {
        let employeeRecord = createEmployeeRecord(array)
        employeeRecords.push(employeeRecord)
    })
    return employeeRecords
}

/* Create function w/ 2 arguments
Add object w/ 3 keys to the timeIn array
*/
function createTimeInEvent(employeeRecord, dateStamp){
    const hour = parseInt(dateStamp.substring(11, 15))
    const date = dateStamp.substring(0, 10)
    let timeInEvent = {
        type: 'TimeIn',
        hour: hour,
        date: date
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const hour = parseInt(dateStamp.substring(11, 15))
    const date = dateStamp.substring(0, 10)
    let timeOutEvent = {
        type: 'TimeOut',
        hour: hour,
        date: date
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
    const date = dateStamp.substring(0, 10)
    let timeInHours = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOutHours = employeeRecord.timeOutEvents.find(event => event.date === date)
    let hoursWorked = (timeOutHours.hour - timeInHours.hour) / 100
    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateStamp)
    let payRate = employeeRecord.payPerHour
    let payOwed = hoursWorked * payRate
    return payOwed
}

function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date)
    const wagesForDates = dates.map(date => wagesEarnedOnDate(employeeRecord, date));

    const totalWages = wagesForDates.reduce((total, wages) => total + wages, 0);
  
    return totalWages;
}

// let Luca = createEmployeeRecord(['Luca', 'Saldana', 'Boi', 55])
// createTimeInEvent(Luca, "0044-03-15 0900")
// createTimeOutEvent(Luca, "0044-03-15 1100")
// allWagesFor(Luca)

function calculatePayroll(employeeRecords) {
    let totalPay = 0
    employeeRecords.forEach((employeeRecord) => {
        totalPay += allWagesFor(employeeRecord)
    })
    console.log(totalPay)
    return totalPay
    // const datesWorked = wagesEarnedOnDate(employeeRecord, dateStamp)
    // const employeeRecords = createEmployeeRecords(arrayOfArrays)
    // // const wagesForEmployees = employeeRecords.map(allWagesFor); // Calculate wages for each employee
    // // const totalPayroll = wagesForEmployees.reduce((total, wages) => total + wages, 0); // Sum up all wages
    // return totalPayroll
}