import API from "./journalAPI.js";
import injectDOM from "./entriesDOM.js";
import dropdown from "./moodDropDown.js";
import webComponent from "./entryComponent.js";
import validateInputString from "./inputValidator.js";
import editEventListener from "./editEventListener.js";

console.log("If you can see this your journal JS file is properly linked.")
//makes the mood dropdown
dropdown.moodDropdown();
//dynamically generates the formHTML
injectDOM.addFormToDom();
//this makes sure we have journal entries on the page when it loads//
API.getJournalEntries().then(data => injectDOM.addToDom(data));

//add event listener for submit button
document.querySelector("#saveButton")
	.addEventListener("click", event => {
		// declare variables from form values
		let dateInput = document.querySelector("#date").value;
		let moodInput = document.querySelector("#mood").value;
		let conceptsInput = document.querySelector("#concept").value;
        let entryInput = document.querySelector("#content").value;
        //check if fields are empty
        if (entryInput === "") {
			window.alert("You haven't written anything");
		} else if (moodInput === "") {
			window.alert("Please tell me how you're feeling today");
		} else if (conceptsInput === "") {
			window.alert("What did you learn that day?");
		} else if (dateInput === "") {
			window.alert("What day did you learn this?");
		} else {
            entryInput = validateInputString(entryInput);
            conceptsInput = validateInputString(conceptsInput);
        //create object
            const completedForm = {
    				date: dateInput,
    				moodId: moodInput,
    				concept: conceptsInput,
                    content: entryInput
                }
            console.log(completedForm)
            API.saveJournalEntry(completedForm)
                .then( () => {
                    //clears entry log to be repopulated by the database with the new entry//
                    document.querySelector("#entryLog").innerHTML = ""
                    API.getJournalEntries()
                    //then take data and add to DOM
                    .then(data => injectDOM.addToDom(data));
                    })


}})

//delete button to remove entries from json db and refresh DOM//
const resultsContainer =  document.querySelector("#entryLog").addEventListener("click", (event) => {
    if (event.target.id.startsWith("deleteEntry--")) {
        //extract entry ID from button ID//
        console.log(event, event.target.id.split("--")[1])
        document.querySelector("#entryLog").innerHTML = "";
        API.deleteEntry(event.target.id.split("--")[1])
            .then(() => {
                //clear entryLog then populate with current db//
                API.getJournalEntries().then(data => injectDOM.addToDom(data));
            })
//otherwise if you see an edit button, replace the form with an edit form//
//you need to refactor this into a .then statment like above,
//also consider populating a modal instead//
    } else if (event.target.id.startsWith("editEntry")) {
        console.log("edit save button is called")
        console.log("edit", event.target.id.split("--")[1])
        const formContainer = document.querySelector("#journalForm");
        formContainer.innerHTML = "";
        let entryIdtoEdit = event.target.id.split("--")[1]
        injectDOM.addEditFormToDom()
        const editContainer = document.querySelector("#journalForm")
        editContainer.scrollIntoView();
        dropdown.moodDropdown().then(() => editFormFields(entryIdtoEdit))
        // API.getJournalEntries().then(data => injectDOM.addToDom(data));
    }
})
//meant to populate the form fields//
const editFormFields  = entryIdtoEdit => {
    let hiddenId = document.querySelector("#entryId")
    let dateInput = document.querySelector("#edate")
    let moodInput = document.querySelector("#eMood")
    let conceptsInput = document.querySelector("#econcept")
    let entryInput = document.querySelector("#econtent")
    //
    API.getSpecificEntry(entryIdtoEdit).then(entry => {
        console.log(entry)
        hiddenId.value = entry.id;
        moodInput.value = entry.moodId;
        dateInput.value = entry.date;
        conceptsInput.value = entry.concept;
        entryInput.value = entry.content;
        console.log("entry.moodId is:" + entry.moodId)
        return entry
})
.then(entry => {
    document.querySelector("#editSaveButton").addEventListener("click", function() {editEventListener.savetoJson(entry)})
})
}