const requestURL = 'scripts/directory.json';
const spotlightSection = document.querySelector('.spotlightSection');
const spotlightOptions = [];
let counter = 1;

async function getSpotlight() {
    const response = await fetch(requestURL);
    if(response.ok) {
        const data = await response.json();
        const spotlight = await findSpotlight(data.businesses);
        let len = spotlight.length;
        for (let i = 0; i < len; i++) {
            spotlightOptions.push(i);
        };
        let random = 0;
        let max = spotlightOptions.length;
        for (let i = 0; i < 3; i++) {
            random = spotlightOptions[Math.floor(Math.random() * max)];
            spotlightOptions.push(spotlightOptions[random]);
            spotlightOptions.splice(spotlightOptions.indexOf(random), 1);
            max--;
            displaySpotlight(spotlight[random]);
        };
    };
};

function findSpotlight(data) {
    let spotlight = data.filter(business => business.membership_level == 'Gold' || business.membership_level == 'Silver');
    return spotlight;
}

function displaySpotlight(business) {
    let div = document.createElement('div');
    let name = document.createElement('h3');
    let picture = document.createElement('picture');
    let image = document.createElement('img');
    let slogan = document.createElement('p');
    let hr = document.createElement('hr');
    let info = document.createElement('p');

    div.setAttribute('class', `spotlight spotlight${counter}`);
    name.textContent = business.name;
    picture
    image.setAttribute('src', `images/${business.image_src}`);
    image.setAttribute('alt', `${business.name}'s logo`);

    if (business.id == 2 || business.id == 5) {
        image.setAttribute('class', 'whiteBackground');
    };

    if (business.id == 8 || business.id == 9) {
        image.setAttribute('class', 'extraPadding');
    };

    if (business.id == 3) {
        image.setAttribute('class', 'creeksidePT');
    };

    picture.appendChild(image);

    slogan.textContent = business.slogan;
    slogan.setAttribute('class', 'spotlight-tagline');

    hr;

    info.innerHTML = `${business.address}<br />${business.phone} | <a href="${business.website}" target="_blank">Website</a>`;

    div.appendChild(name);
    div.appendChild(picture);
    div.appendChild(slogan);
    div.appendChild(hr);
    div.appendChild(info);

    spotlightSection.appendChild(div);

    counter++;
};

getSpotlight();