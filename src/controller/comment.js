import {db, apiResponse} from "./api/firebase"

const addComment = (newComment, callback) => {
    db.collection("comments").doc(newComment.id).set(newComment)
    .then(function() {
        console.log("Add comment sucessfully!");
        callback(apiResponse(true, "Add comment successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when adding comment: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}

const getComments = (noteId, callback) => {
    db.collection("comments").where("noteId", "==", noteId)
    .get()
    .then(function(querySnapshot) {
        let comments = []
        querySnapshot.forEach(function(doc) {
            var comment = doc.data()
            comment.creationDate = comment.creationDate.toDate()
            comments.push(comment)
        });
        callback(apiResponse(true, "Getting comments sucessfully.", comments));
    })
    .catch(function(error) {
        console.error("Error when getting comments: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null));
    });
}

const updateComment = (updatedComment, callback) => {
    db.collection("comments").doc(updatedComment.id).set(updatedComment)
    .then(function() {
        console.log("Update comment sucessfully!");
        callback(apiResponse(true, "Update comment successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when updating comment: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}


const deleteComment = (commentId, callback) => {
    db.collection("comments").doc(commentId).delete()
    .then(function() {
        console.log("Delete comment sucessfully!");
        callback(apiResponse(true, "Delete comment successfully.", null))
    })
    .catch(function(error) {
        console.error("Error when deleting comment: ", error);
        callback(apiResponse(false, "There's some error! Please try again", null))
    });
}


export {
    addComment,
    getComments,
    deleteComment,
    updateComment
}