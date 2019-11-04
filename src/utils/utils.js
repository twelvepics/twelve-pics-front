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

// const setWebkitHomeLayout = function () {
//     console.log("Setting webkit home layout");
//     // BODY
//     // const b = document.body;
//     // b.classList.add("modal-open");
//     // b.classList.add('no-scrollbar-webkit');
//     const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
//     const body = document.body;
//     body.style.position = 'fixed';
//     body.style.top = `-${scrollY}`;
//     body.classList.add('no-scrollbar-webkit');
// }

// const resetWebkitHomeLayout = function () {
//     console.log("Resetting webkit home layout");
//     // BODY
//     // const b = document.body;
//     // b.classList.remove("modal-open");
//     // b.classList.remove('no-scrollbar-webkit');
//     const body = document.body;
//     const scrollY = body.style.top;
//     body.style.position = '';
//     body.style.top = '';
//     window.scrollTo(0, parseInt(scrollY || '0') * -1);
//     body.classList.remove('no-scrollbar-webkit');
// }

// const setOthersLayout = function () {
//     console.log("Setting others home layout");
//     // HTML
//     const h = document.getElementsByTagName('html')[0];
//     h.classList.add("no-scroll");
//     h.style.overflowX = "visible";
//     h.style.overflowY = "visible";
//     // BODY
//     const b = document.body;
//     b.classList.add("modal-open");
//     b.classList.add('no-scroll');
// }

// const resetOthersLayout = function () {
//     console.log("Resetting others home layout");
//     // HTML
//     const h = document.getElementsByTagName('html')[0];
//     h.style.overflowX = "hidden";
//     h.style.overflowY = "scroll";
//     // BODY
//     const b = document.body;
//     b.classList.remove("modal-open");
//     b.classList.remove('no-scroll');
// }

exports.setHomeLayout = function () {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
    if (isWebkit()) {
        body.classList.add('no-scrollbar-webkit');
    } else {
        const h = document.getElementsByTagName('html')[0];
        h.classList.add("frf-hide-sb");
    }
}

exports.resetHomeLayout = function () {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    if (isWebkit()) {
        body.classList.remove('no-scrollbar-webkit');
    } else {
        const h = document.getElementsByTagName('html')[0];
        h.classList.remove("frf-hide-sb");
    }
}

exports.lockBgScroll = function () {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
};


exports.unlockBgScroll = function () {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

window.addEventListener('scroll', () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
});


