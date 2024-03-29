console.log("If you can see this your data JS file is properly linked.")
//API station

//function to push input to database.json//
const API = {
    getMoods: () => {
        return fetch("http://localhost:3000/moods")
            .then(response => response.json())
    },
    getJournalEntries: () => {
        return fetch("http://localhost:3000/journalArray?_sort=date&_order=desc&_expand=mood")
            .then(response =>
                response.json()
            );
    },
    saveJournalEntry: entry => {
        return fetch("http://localhost:3000/journalArray", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        });
    },
    deleteEntry: (id) => {
        return fetch(`http://localhost:3000/journalArray/${id}`, {
            method: "DELETE"
        }).then(response => response.json())
    },
    editEntry: (id, entryUpdateObj) => {
        // const entryUpdateObj = {
        //     // name: document.querySelector("#entryName").value
        // }
        return fetch(`http://localhost:3000/journalArray/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entryUpdateObj)
        }).then(response => response.json())
    },
    getSpecificEntry: (id) => {
        return fetch(`http://localhost:3000/journalArray/${id}`)
            .then(response => response.json())
    }
};

export default API



