document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.querySelector('header[id="main-header"]');
    const footerPlaceholder = document.querySelector('footer[id="main-footer"]');

    const loadComponent = async (url, placeholder) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to load component: ${url}`);
            }
            const text = await response.text();
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = text;
            const componentElement = tempDiv.firstElementChild;
            placeholder.replaceWith(componentElement);
            return componentElement;
        } catch (error) {
            console.error(error);
            placeholder.innerHTML = `<p class="text-center text-red-500">${error.message}</p>`;
        }
    };

    const initializeComponents = async () => {
        // Load header and footer in parallel
        const [header] = await Promise.all([
            headerPlaceholder ? loadComponent('/_header.html', headerPlaceholder) : Promise.resolve(),
            footerPlaceholder ? loadComponent('/_footer.html', footerPlaceholder) : Promise.resolve()
        ]).catch(err => console.error("Error loading components", err));

        // --- After header is loaded, initialize its scripts ---
        if (header) {
            // Active link styling
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = header.querySelectorAll('a');
            navLinks.forEach(link => {
                const linkPage = (link.getAttribute('href') || '').split('/').pop() || 'index.html';
                if (linkPage === currentPage) {
                    link.classList.add('font-semibold', 'text-secondary-red');
                }
            });

            // Mobile menu toggle
            const menuBtn = header.querySelector('#menuBtn');
            const mobileMenu = header.querySelector('#mobileMenu');
           if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    mobileMenu.classList.toggle('hidden');
                });
            }
        }
    };

    if (headerPlaceholder || footerPlaceholder) {
        initializeComponents();
    }
});