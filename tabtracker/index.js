
let myLeads =  []
const inputEl = document.getElementById("input")
const saveBtn = document.getElementById("save-btn")
const tabBtn = document.getElementById("tab-btn")
const deleteBtn = document.getElementById("delet-btn")
const ulEl = document.getElementById("ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))


if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}


function render(Leads){

    let local=""

    for(let i=0;i<Leads.length;i++){
        local+=`
        <li>
        <a target='_blank' href='${Leads[i]}'>
        ${Leads[i]}
        </a>
                    
        </li>
        `
        ulEl.innerHTML=local
    }
}
 
tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
saveBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=''
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})