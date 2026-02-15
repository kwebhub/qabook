const REPO_NAME = '/qabook';
const SCHEMA_ID = 'breadcrumb-schema';
const formatName = (segment) => {
    const decoded = decodeURIComponent(segment.replace('.html', '').replace(/-/g, ' '));
    return decoded.charAt(0).toUpperCase() + decoded.slice(1);
};
export function initBreadcrumbs() {
    const container = document.getElementById('breadcrumbs-container');
    if (!container)
        return;
    const { pathname, origin } = window.location;
    const segments = pathname.split('/')
        .filter(s => s && s !== 'index.html' && s !== REPO_NAME.replace('/', ''));
    if (segments.length === 0) {
        container.style.display = 'none';
        container.innerHTML = '';
        return;
    }
    container.style.display = 'block';
    const breadcrumbList = [{ name: 'Home', item: `${origin}${REPO_NAME}/` }];
    let currentPath = REPO_NAME;
    const itemsHtml = segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        currentPath += `/${segment}`;
        const name = formatName(segment);
        breadcrumbList.push({ name, item: origin + (isLast ? pathname : currentPath) });
        return `<li class="breadcrumbs__item">
      ${isLast ? name : `<a href="${currentPath}">${name}</a>`}
    </li>`;
    });
    container.innerHTML = `
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <a href="${REPO_NAME}/">
          <svg class="breadicon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display: block;">
            <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
          </svg>
        </a>
      </li>
      ${itemsHtml.join('')}
    </ul>`;
    generateSchema(breadcrumbList);
}
function generateSchema(items) {
    document.getElementById(SCHEMA_ID)?.remove();
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item
        }))
    };
    const script = document.createElement('script');
    script.id = SCHEMA_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}
