const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
const cards = document.querySelector('.cards');

async function getProphets() {
    const response = await fetch(requestURL);
    if(response.ok) {
        const data = await response.json();
        data.prophets.forEach(prophet => { displayProphets(prophet) });
    };
};

function displayProphets(prophet) {
    // Create elements to add to the document
    let card = document.createElement('section');
    let h2 = document.createElement('h2');
    let birthdate = document.createElement('p');
    let birthplace = document.createElement('p');
    let portrait = document.createElement('img');

    // Add content to the elements
    card.setAttribute('class', 'card');
  
    // Change the textContent property of the h2 element to contain the prophet's full name
    h2.textContent = `${prophet.name} ${prophet.lastname}`;
  
    // Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', 
        `Portait of ${prophet.name} ${prophet.lastname} - Latter-day President #${prophet.order}`);
    portrait.setAttribute('loading', 'lazy');

    // Change the innerHTML property of the birthdate element to contain the prophet's birthdate
    birthdate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;

    // Change the innerHTML property of the birthplace element to contain the prophet's birthplace
    birthplace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;
  
    // Add/append the section(card) with the h2 element
    card.appendChild(h2);
    card.appendChild(portrait);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
  
    // Add/append the existing HTML div with the cards class with the section(card)
    cards.appendChild(card);
  };

getProphets();