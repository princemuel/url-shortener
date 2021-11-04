// if statements to check local storage status i.e empty or not
let links = (localStorage.getItem('shortenedLinks'))?JSON.parse(localStorage.getItem('shortenedLinks')):{
    shortenedLink: [],
};

function linksObjectUpdated() {
    localStorage.setItem('shortenedLinks', JSON.stringify(links));
}

export const  addItems = (value)=> {
    display(value);
    document.getElementById('link-input').value ='';
    
    let linkDetails = {
        code: value.code,
        original_link: value.original_link,
        full_short_link: value.full_short_link
    }
    links.shortenedLink.push(linkDetails);

    linksObjectUpdated()
};

const display =  (data) => {

    let list = document.querySelector(".shortened-links")

    let item = document.createElement('li');
    item.classList.add("shortened-link")

    let leftDiv = document.createElement('div');
    leftDiv.classList.add("shortened-link--left")
    let para = document.createElement('p');
    para.textContent = data.original_link;
    para.title = data.original_link;

    let rightDiv = document.createElement('div');
    rightDiv.classList.add("shortened-link--right")
    let aLink = document.createElement('a');
    aLink.textContent = data.full_short_link
    aLink.href = data.full_short_link;
    aLink.target = "_blank";
    aLink.id = data.code;
    let button = document.createElement('button');
    button.classList.add("btn", "btn-primary", "btn-large", "btn--white")
    button.textContent = "copy"


    leftDiv.appendChild(para);
    rightDiv.appendChild(aLink);
    rightDiv.appendChild(button);
    item.appendChild(leftDiv);
    item.appendChild(rightDiv);

    list.insertBefore(item, list.childNodes[0]);
};


function renderLinks() {
    // if both the todo and completed list are empty return nothing close function
    if (!links.shortenedLink.length) return;

    for (let i = 0; i < links.shortenedLink.length; i++) {
        let value = links.shortenedLink[i];
        console.log(value.code)
        display(value);
    }
}


renderLinks();