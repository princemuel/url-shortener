

export const display =  (data) => {
    let list = document.querySelector(".shortened-links")

    let item = document.createElement('li');
    item.classList.add("shortened-link")

    let leftDiv = document.createElement('div');
    leftDiv.classList.add("shortened-link--left")
    let para = document.createElement('p');
    para.textContent = data.original_link;

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