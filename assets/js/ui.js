export function initUI() {
    const body = document.body;
    const selectors = {
        '#dropup': 'show-dropup',
        '#settings': 'show-settings',
        '#user': 'show-user',
        '#search': 'show-search'
    };
    const searchForm = document.querySelector('.search__content');
    const searchInput = searchForm?.querySelector('input');
    const updateState = () => {
        if (!searchInput || !searchForm)
            return;
        const isDirty = searchInput.value.trim().length > 0;
        searchForm.classList.toggle('is-dirty', isDirty);
    };
    Object.entries(selectors).forEach(([id, className]) => {
        const btn = document.querySelector(id);
        btn?.addEventListener('click', () => {
            body.className = className;
        });
    });
    const closeAll = () => body.className = '';
    document.querySelector('.close')?.addEventListener('click', closeAll);
    window.addEventListener('click', (e) => {
        const target = e.target;
        const currentClass = body.className.replace('show-', '');
        if (currentClass && target.classList.contains(currentClass)) {
            closeAll();
        }
    });
    searchInput?.addEventListener('input', updateState);
    searchForm?.addEventListener('reset', () => {
        setTimeout(updateState, 0);
    });
    document.querySelector('#home')?.addEventListener('click', () => {
        window.location.href = '/';
    });
}
