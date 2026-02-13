document.addEventListener("DOMContentLoaded", () => {
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
        document.querySelector(id)?.addEventListener('click', () => {
            body.className = className;
        });
    });
    const closeAll = () => body.className = '';
    document.querySelector('.close')?.addEventListener('click', closeAll);
    window.onclick = (e) => {
        const target = e.target;
        if (target.classList.contains(body.className.replace('show-', ''))) {
            closeAll();
        }
    };
    searchInput?.addEventListener('input', updateState);
    searchForm?.addEventListener('reset', () => {
        setTimeout(updateState, 0);
    });
});
export {};
