import webComponent from "./entryComponent.js";
console.log("If you can see this your entriesDOM JS file is properly linked.")

const injectDOM = {
    //inject multiple entries into the journal container
    addToDom: function(entries) {
        console.log("add to dom called")
    entries.forEach(item => {
        //this links the entry log div to now = the journal container
        const journalContainer = document.querySelector("#entryLog");
        journalContainer.innerHTML += webComponent.entryHTML(item);   
        })
    }, 
    //inject entry to top of journal container
    addEntToDom: function(entry) {
    const journalContainer = document.querySelector("#entryLog");
    journalContainer.innerHTML += 
        webComponent.entryHTML(entry) + journalContainer.innerHTML;
    },
    refreshDOM: function(entries) {
        const journalContainer = document.querySelector("#entryLog");
        journalContainer.innerHTML = "";
        entries.forEach(item => {
            journalContainer.innerHTML += webComponent.entryHTML(item);
        })
    },
    addFormToDom: () => {
        console.log("add Form to dom called")
        document.querySelector("#journalForm").innerHTML = webComponent.formHTML()
        },
    addEditFormToDom: () => {
        console.log("add Form to dom called")
        document.querySelector("#journalForm").innerHTML = webComponent.editFormHTML()
        }
    // filterMood: (entries, mood) => {
    //             const journalContainer = document.querySelector("#entryLog");
    //             journalContainer.innerHTML = "";
    //             const filteredEntries = entries.filter(entry => entry.moodId === mood);
    //             filteredEntries.forEach(entry => {
    //                 journalContainer.innerHTML += webComponent.entryHTML(entry);
    //             })
    //         }
};
export default injectDOM