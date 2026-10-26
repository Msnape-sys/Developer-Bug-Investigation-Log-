
const deleteBugBtn = document.querySelectorAll('.fa-trash')


//const newNotes = bugContainer.querySelector("#bug-notes").value;
const updateBtn = document.querySelectorAll('#update-button')


// event listener assignments

Array.from(updateBtn).forEach((element)=>{
    element.addEventListener('click', updateBug)
console.log('number of btns is: ',updateBtn.length)
})

Array.from(deleteBugBtn).forEach((element)=>{
    element.addEventListener('click', deleteBug)
})
// update function 
async function updateBug(event){
    const bugContainer = event.target.closest('.bug-container')
    const newStatus = bugContainer.querySelector('#status-update').value
    const notesUpdate = bugContainer.querySelector('#bug-notes').value  
    const bugId = bugContainer.dataset.id
    console.log(newStatus,notesUpdate)
    try{
       
        const response = await fetch('update', {
           
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bugId': bugId,
              'newStatus': newStatus,
              'newNotes': notesUpdate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
// deletion function

async function deleteBug(event){
    const bugContainer = event.target.closest('.bug-container')
    const bugId = bugContainer.dataset.id
    try{

        const response = await fetch('/deleteBug', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'bugId': bugId,
            })
           })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function updateNotes(){
    
    const notes = bugContainer.querySelector('#bug-notes').value

    try{
        const response = await fetch('update-notes', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'notesUpdate': notes,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}