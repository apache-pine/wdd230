const input = document.querySelector('input');

const button = document.querySelector('button');

const list = document.querySelector('ul');

button.addEventListener('click', function() {
    if (input.value == "") {
        return False;
    } else {
        const new_item = document.createElement('li');
        const new_button = document.createElement('button');

        

        new_item.textContent = input.value;

        new_button.textContent = '❌';

        new_item.appendChild(new_button);

        list.appendChild(new_item);

        new_button.addEventListener('click', function() {
            list.removeChild(new_item);
        });

        input.value = '';

        input.focus();
    }
})