// Your code here
function createEmployeeRecord(firstArg){
    let newObject = {
        firstName: firstArg[0],
        familyName: firstArg[1],
        title: firstArg[2],
        payPerHour: firstArg[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return newObject;

}

function createEmployeeRecords(firstArg){
    for(let i=0; i<firstArg.length; i++){
    let newArray = firstArg.map(createEmployeeRecord)
    return newArray;
    }
}

function createTimeInEvent(record, dateStamp){
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(dateStamp.slice(11,15)), date: dateStamp.slice(0,10)})
    return record
}

function createTimeOutEvent(record,dateStamp){
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(dateStamp.slice(11,15)), date: dateStamp.slice(0,10)})
    return record
}


function hoursWorkedOnDate(record, dayOfWork){
    let inEvent = record.timeInEvents.find(function(e){
        return e.date === dayOfWork
    })

    let outEvent = record.timeOutEvents.find(function(e){
        return e.date === dayOfWork
    })

    return (outEvent.hour - inEvent.hour) / 100 

}

function wagesEarnedOnDate(record,date){
    return (hoursWorkedOnDate(record, date)*record.payPerHour)
}


function findEmployeeByFirstName(stuff,first){
    if (stuff[0].firstName === first){
        return stuff[0];
    }

}

function allWagesFor(record){
    const allWages = record.timeInEvents.map(event => wagesEarnedOnDate(record, event.date));
    return allWages.reduce((total, wage) => total + wage)
    
}

function calculatePayroll(record){
    const totalForEachEmployee = record.map(arg => allWagesFor(arg))
    return totalForEachEmployee.reduce((total, recTotal) => total + recTotal)
  }



