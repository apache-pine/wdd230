const requestURL = 'scripts/directory.json';
const cards = document.querySelector('.cards');

async function getBusinesses() {
    const response = await fetch(requestURL);
    if(response.ok) {
        const data = await response.json();
        data.businesses.forEach(business => {displayBusinesses(business) });
    };
};

function displayBusinesses(business) {
    let card = document.createElement('section');
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    let address = document.createElement('p');
    let phone = document.createElement('p');
    let website = document.createElement('a');
    let figure = document.createElement('figure');
    let image = document.createElement('img');
    let slogan = document.createElement('figcaption');
    let hr = document.createElement('hr');
    
    card.setAttribute('class', 'card');
    card.setAttribute('id', `card${business.id}`)

    figure.setAttribute('class', 'cardImage');

    h3.textContent = business.name;

    div.setAttribute('class', 'businessName');
    div.appendChild(h3);

    image.setAttribute('src', `images/${business.image_src}`);
    image.setAttribute('alt', `${business.name}'s logo`);
    image.setAttribute('loading', 'lazy');

    slogan.setAttribute('class', 'slogan');
    slogan.textContent = business.slogan;

    hr;

    address.textContent = business.address;
    phone.textContent = business.phone;
    website.setAttribute('href', business.website);
    website.setAttribute('target', '_blank');
    website.textContent = "Website";

    figure.appendChild(image);
    figure.appendChild(slogan);

    card.appendChild(div);
    card.appendChild(figure);
    card.appendChild(hr);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    cards.appendChild(card);
};

getBusinesses();

const gridButton = document.querySelector('#gridBtn');
const listButton = document.querySelector('#listBtn');
const display = document.querySelector('.cards');

gridButton.addEventListener('click', () => {
    display.classList.add('grid');
    display.classList.remove('list');
});

listButton.addEventListener('click', () => {
    display.classList.add('list');
    display.classList.remove('grid');
});