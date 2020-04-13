let oldHref = document.location.href;

window.addEventListener('load', () => {
    const body = document.querySelector('body');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(function() {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                document.dispatchEvent(new Event('href-change'));
            }
        });
    });

    observer.observe(body!, {
        childList: true,
        subtree: true
    });
});
