document.addEventListener('DOMContentLoaded',function() {
    var select = document.querySelector('select[name="reason"]');
    if(select) {
        select.onchange = reasonChange;
        reasonChange();

        document.querySelector('form').addEventListener('submit', formSubmit);
    }

    if(isTouchDevice()) {
        document.querySelector('.dropdown').addEventListener('click', clickDropdown);
    }
},false);

function isTouchDevice(){
    return typeof window.ontouchstart !== 'undefined';
}

var firstDropdownClick = true;
function clickDropdown(event) {
    if(event.target.classList.contains('dropdown__title') && firstDropdownClick) {
        firstDropdownClick = false;
        event.preventDefault();

        setTimeout(function() {
            firstDropdownClick = true;
        }, 2000);
    }
}

function reasonChange() {
    var reason = event.target.value;
    var conditions = document.querySelector('.form__conditions');
    var submit = document.querySelector('input[type="submit"]');

    conditions.style.display = reason === 'commande' ? 'block' : 'none';

    if(typeof(reason) === 'undefined' || reason === 'none') {
        submit.setAttribute('disabled', 'disabled');
    } else {
        submit.removeAttribute('disabled');
    }
}

function formSubmit(event) {
    var reason = document.querySelector('select[name="reason"]').value;
    var conditions = document.getElementById('conditions').checked;

    if(reason === 'commande' && ! conditions) {
        alert("Veuillez accepter les conditions générales.");
        event.preventDefault();
    }
}

