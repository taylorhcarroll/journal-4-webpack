//this file display datab from db within input fields
import API from "./journalAPI.js";

const editForm = (entryID) => {
    const editEntryID = document.querySelector("#entryId")
    const editConcept = document.querySelector("#entryConcept")
    const editDate = document.querySelector("#entryDate")
    const editContent = document.querySelector("#entryContent")
    const editMood = document.querySelector("#entryMood")

    API.getSpecificEntry(entryID)
    .then(response => {
        editEntryID.value = entryId;
        editConcept.value = response.concept;
        editDate.value = response.date;
        editContent.value = response.content;
        editMood.value = response.mood;
    })
}

export default editForm