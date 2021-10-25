const BACKGROUNDS = [
    'url("img/colin-lloyd-Mq5jKSSDxLY-unsplash.jpg")',
    'url("img/fakurian-design-E8Ufcyxz514-unsplash.jpg")',
    'url("img/fakurian-design-tac7TY2ItGA-unsplash.jpg")',
    'url("img/li-zhang-K-DwbsTXliY-unsplash.jpg")',
    'url("img/li-zhang-LpZtpaplYt8-unsplash.jpg")',
    'url("img/marian-kroell-lqBmSXnXScs-unsplash.jpg")',
    'url("img/spacejoy-x3mSC1WnWhc-unsplash.jpg")',
    'linear-gradient(#e66465, #9198e5)',
    'linear-gradient(#000000, #4f4f4f, #f9f9f9)'
];

async function onload() {
    const qs = new URLSearchParams(window.location.search);

    const scrollbar = document.querySelector('fluent-scrollbar');
    const main = document.querySelector('main');

    // Set the mode [Expanded | Collapsed]
    if (qs.has('m')) {
        scrollbar.setAttribute('mode', qs.get('m'));
    } else {
        scrollbar.setAttribute('mode', 'collapsed')
    }

    // Set the theme [Light | Dark]
    if (qs.has('t')) {
        scrollbar.setAttribute('theme', qs.get('t'));
    } else {
        scrollbar.setAttribute('theme', 'light');
    }

    // Set the variation [Fluent | Edge | OneNote]
    if (qs.has('v')) {
        scrollbar.setAttribute('variation', qs.get('v'));
    } else {
        scrollbar.setAttribute('variation', 'fluent');
    }

    // Set the background image
    if (qs.has('bg')) {
        const idx = parseInt(qs.get('bg'));
        
        if (idx < BACKGROUNDS.length) {
            main.style.backgroundImage = BACKGROUNDS[idx];
        }
    } else {
        main.style.backgroundImage = BACKGROUNDS[0];
    }

    // Set the thumb outline
    if (qs.has('o')) {
        scrollbar.setAttribute('outline', qs.get('o'));
    } else {
        scrollbar.setAttribute('outline', '0');
    }

    // Set the interactive mode
    if (qs.has('i')) {
        scrollbar.setAttribute('interactive', qs.get('i'));
    } else {
        scrollbar.setAttribute('interactive', 'false');
    }

    if (qs.has('a')) {
        scrollbar.setAttribute('acrylic', qs.get('a'));
    } else {
        scrollbar.setAttribute('acrylic', 'false');
    }

    /*---------------------------------------------------------
    SCROLLING
    */
    document.querySelector('body').addEventListener('scroll', function(e) {
        const scrollbar = document.querySelector('fluent-scrollbar');
        const percent = e.target.scrollTop / (e.target.scrollHeight - document.body.clientHeight);
        scrollbar.percent = percent;
    })

    // Show the scrollbar
    scrollbar.setAttribute('visible', 'true');
}

if (document.readyState != 'loading') {
    onload();
} else {
    document.addEventListener('DOMContentLoaded', onload);
}