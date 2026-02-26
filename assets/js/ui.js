const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};
export function initUI() {
    const body = document.body;
    const searchForm = document.querySelector('.search__content');
    const searchInput = searchForm?.querySelector('input');
    const REPO_NAME = '/';
    const menuActions = {
        'dropup': 'dropup',
        'search': 'search',
        'home': 'home-redirect'
    };
    const closeMenu = () => {
        body.dataset.activeMenu = '';
        body.style.overflow = '';
        searchForm?.reset();
    };
    document.addEventListener('click', (e) => {
        const target = e.target;
        const backTopBtn = target.closest('.backtop');
        if (backTopBtn) {
            e.stopPropagation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (target.classList.contains('search') || target.closest('.close') || target.dataset.overlay === 'true') {
            closeMenu();
            return;
        }
        const btn = target.closest('[id]');
        if (!btn)
            return;
        const action = menuActions[btn.id];
        if (action === 'home-redirect') {
            window.location.href = REPO_NAME;
        }
        else if (action) {
            body.dataset.activeMenu = action;
            body.style.overflow = 'hidden';
            if (action === 'dropup')
                window.scrollTo({ top: 0, behavior: 'smooth' });
            if (action === 'search') {
                setTimeout(() => searchInput?.focus(), 60);
            }
        }
    });
    if (searchForm && searchInput) {
        const update = () => searchForm.classList.toggle('is-dirty', !!searchInput.value.trim());
        searchInput.addEventListener('input', update);
        searchForm.addEventListener('reset', () => setTimeout(update, 0));
    }
    const themeInput = document.querySelector('.toggle__input');
    themeInput?.addEventListener('change', () => {
        body.classList.toggle('green-theme', themeInput.checked);
    });
    const backTop = document.querySelector('.backtop');
    let lastScrollY = window.scrollY;
    if (backTop) {
        window.addEventListener('scroll', throttle(() => {
            const currentScrollY = window.scrollY;
            const isMenuOpen = !!body.dataset.activeMenu;
            const isScrollingDown = currentScrollY > lastScrollY;
            const shouldShow = isScrollingDown && currentScrollY > 150 && !isMenuOpen;
            backTop.classList.toggle('back-top--visible', shouldShow);
            lastScrollY = currentScrollY;
        }, 100), { passive: true });
    }
}
