export function initBreadcrumbs() {
    const container = document.getElementById('breadcrumbs-container');
    if (!container)
        return;
    const path = window.location.pathname;
    const origin = window.location.origin;
    const repoName = '/qabook';
    const segments = path.split('/')
        .filter(s => s && s !== 'index.html' && s !== 'qabook');
    if (segments.length === 0) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
    }
    else {
        container.style.display = 'block';
    }
    const breadcrumbList = [{
            name: 'Home',
            item: origin + repoName + '/'
        }];
    let html = `
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <a href="${repoName}/">
          <svg class="breadicon" xmlns="http://www.w3.org" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="display: block;">
            <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
          </svg>
        </a>
      </li>`;
    let currentPath = repoName;
    segments.forEach((segment, index) => {
        const isLast = index === segments.length - 1;
        currentPath += `/${segment}`;
        let name = segment.replace('.html', '').replace(/-/g, ' ');
        name = decodeURIComponent(name.charAt(0).toUpperCase() + name.slice(1));
        if (isLast) {
            html += `<li class="breadcrumbs__item">${name}</li>`;
            breadcrumbList.push({ name, item: origin + path });
        }
        else {
            html += `<li class="breadcrumbs__item"><a href="${currentPath}">${name}</a></li>`;
            breadcrumbList.push({ name, item: origin + currentPath });
        }
    });
    html += `</ul>`;
    container.innerHTML = html;
    generateSchema(breadcrumbList);
}
function generateSchema(items) {
    const oldScript = document.querySelector('script[type="application/ld+json"]#breadcrumb-schema');
    if (oldScript)
        oldScript.remove();
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
    script.id = 'breadcrumb-schema';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
}
