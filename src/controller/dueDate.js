import {db, apiResponse} from "./api/firebase"


const getDueDates = (courseId, callback) => {
    db.collection("due_dates").where("courseId", "==", courseId)
    .get()
    .then(function(querySnapshot) {
        let dueDates = []
        querySnapshot.forEach(function(doc) {
            var date = doc.data();
            date.deadline = date.deadline.toDate();
            dueDates.push(date)
        });
        callback(apiResponse(true, "Getting due dates sucessfully.", dueDates));
    })
    .catch(function(error) {
        console.error("Error when getting due dates: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null));
    });
}


const addDueDate = (dueDate, callback) => {
    if(dueDate.deadline.getTime() < new Date().getTime()) {
        callback(apiResponse(false, "This due date is already past!", null))
        return;
    }
    db.collection("due_dates").doc(dueDate.id).set(dueDate)
    .then(function() {
        console.log("Add due date sucessfully!");
        callback(apiResponse(true, "Add due date successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when adding due date: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}

const deleteDueDate = (dueDateId, callback) => {
    db.collection("due_dates").doc(dueDateId).delete()
    .then(function() {
        console.log("Delete due date sucessfully!");
        callback(apiResponse(true, "Delete due date successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when deleting due date: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}

export {
    getDueDates,
    addDueDate,
    deleteDueDate
}