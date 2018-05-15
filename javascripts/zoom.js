var product = document.querySelector('.image-stage');
var img = document.querySelector('.image-wrap');
var plus = document.querySelector('.control-in');
var minus = document.querySelector('.control-out');

var isZoomedIn = false;
var isDown = false;
var start = {x: 0, y: 0};
var current = {x: 0, y: 0};

function startZoom() {
    isZoomedIn = true;
    current = {x: 0, y: 0};
    product.classList.add('zoom-in');
}

function stopZoom() {
    isZoomedIn = false;
    product.classList.remove('zoom-in');
    setTransform({x: 0, y: 0});
}

function setTransform(values) {
    img.setAttribute('style', 'transform: translateX(' + values.x + 'px' + ') translateY(' + values.y + 'px' + ');');
}

function getPositions(e, delta) {
    if(! delta) {
        delta = {x: 0, y: 0}
    }

    var values = {
        x: -(delta.x + product.offsetLeft),
        y: -(delta.y + product.offsetTop)
    };

    if(e.changedTouches && e.changedTouches[0]) {
        values.x += e.changedTouches[0].pageX;
        values.y += e.changedTouches[0].pageY;
    } else {
        values.x += e.pageX;
        values.y += e.pageY;
    }
    return values;
}

function startPan(e) {
    if(! isZoomedIn) {
        startZoom();
    }

    isDown = true;
    start = getPositions(e);
}

function stopPan(e) {
    var position = getPositions(e, start);
    current.x += position.x;
    current.y += position.y;

    isDown = false;
}

function pan(e) {
    if(! isDown) {
        return;
    }

    e.preventDefault();

    var pan = getPositions(e, start);
    pan.x += current.x;
    pan.y += current.y;
    setTransform(pan);
}

plus.addEventListener('click', startZoom);
minus.addEventListener('click', stopZoom);

// Desktop
product.addEventListener("mousedown", startPan);
product.addEventListener("mouseup", stopPan);
product.addEventListener("mouseleave", stopPan);
product.addEventListener("mousemove", pan);

// Touch
product.addEventListener("touchstart", startPan);
product.addEventListener("touchend", stopPan);
product.addEventListener("touchcancel", stopPan);
product.addEventListener("touchmove", pan);
