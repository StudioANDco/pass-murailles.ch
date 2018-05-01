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

    setTimeout(changeSlideshow, 5000);
},false);

var slideshowIndex = 1;
function changeSlideshow() {
    slideshowIndex += 1;
    if(slideshowIndex > 4) {
        slideshowIndex = 1;
    }

    var base = document.querySelector('body').getAttribute('data-baseurl');
    var url = 'background: url("' + base + '/files/slideshow/0' + slideshowIndex + '.jpg") no-repeat no-repeat !important;';
    document.querySelector('body > header').setAttribute('style', url);
}

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

