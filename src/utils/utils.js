///////////////////////////////////////////////////////
// SET HOME LAYOUT NO BACKGROUND SCROLL
///////////////////////////////////////////////////////
const isWebkit = function () {
    console.log(navigator.userAgent);
    if (navigator.userAgent.indexOf("AppleWebKit") !== -1) {
        return true;
    } else {
        return false;
    }
}

const setWebkitHomeLayout = function () {
    console.log("Setting webkit home layout");
    // BODY
    const b = document.body;
    b.classList.add("modal-open");
    b.classList.add('no-scrollbar-webkit');
}

const resetWebkitHomeLayout = function () {
    console.log("Resetting webkit home layout");
    // BODY
    const b = document.body;
    b.classList.remove("modal-open");
    b.classList.remove('no-scrollbar-webkit');
}

const setOthersLayout = function () {
    console.log("Setting others home layout");
    // HTML
    const h = document.getElementsByTagName('html')[0];
    h.classList.add("no-scroll");
    h.style.overflowX = "visible";
    h.style.overflowY = "visible";
    // BODY
    const b = document.body;
    b.classList.add("modal-open");
    b.classList.add('no-scroll');
}

const resetOthersLayout = function () {
    console.log("Resetting others home layout");
    // HTML
    const h = document.getElementsByTagName('html')[0];
    h.style.overflowX = "hidden";
    h.style.overflowY = "scroll";
    // BODY
    const b = document.body;
    b.classList.remove("modal-open");
    b.classList.remove('no-scroll');
}

exports.setHomeLayout = function () {
    if (isWebkit()) {
        setWebkitHomeLayout();
    } else {
        setOthersLayout();
    }
}

exports.resetHomeLayout = function () {
    if (isWebkit()) {
        resetWebkitHomeLayout();
    } else {
        resetOthersLayout();
    }
}


