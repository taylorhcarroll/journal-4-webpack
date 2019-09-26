//this is going to PATCH your edits to the JSON db//
import API from "./journalAPI.js";
import dropdown from "./moodDropDown.js"
import injectDOM from "./entriesDOM.js"
const editEventListener = {
    savetoJson: function(entry) {
    console.log("edit button is called")
    console.log(entry)
    entry.date = document.querySelector("#edate").value
    entry.moodId = document.querySelector("#eMood").value
    entry.concept = document.querySelector("#econcept").value
    entry.content = document.querySelector("#econtent").value
    const hiddenId = document.querySelector("#entryId").value;
        document.querySelector("#entryLog").innerHTML = "";
        document.querySelector("#journalForm").innerHTML = "";
        API.editEntry(hiddenId, entry)
            .then(() => {
                dropdown.moodDropdown();
                injectDOM.addFormToDom();
                API.getJournalEntries().then(data => injectDOM.addToDom(data));
        })
    }
}
export default editEventListener;