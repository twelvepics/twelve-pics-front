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


