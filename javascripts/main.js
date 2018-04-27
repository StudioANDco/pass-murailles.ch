document.addEventListener('DOMContentLoaded',function() {
    document.querySelector('select[name="reason"]').onchange = reasonChange;
    reasonChange();

    document.querySelector('form').addEventListener('submit', formSubmit);
},false);

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

