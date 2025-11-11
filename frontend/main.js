document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
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
        const [header, footer] = await Promise.all([
            headerPlaceholder ? loadComponent('_header.html', headerPlaceholder) : document.getElementById('main-header'),
            footerPlaceholder ? loadComponent('_footer.html', footerPlaceholder) : Promise.resolve()
        ]).catch(err => console.error("Error loading components", err));

        if (footer) {
            footer.classList.add('main-footer');
        }

        const mainHeader = document.getElementById('main-header');

        // --- After header is loaded, initialize its scripts ---
        if (mainHeader) {
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
            const menuBtn = mainHeader.querySelector('#menuBtn');
            const mobileMenu = mainHeader.querySelector('#mobileMenu');
           if (menuBtn && mobileMenu) {
                menuBtn.addEventListener('click', () => {
                    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
                    menuBtn.setAttribute('aria-expanded', !isExpanded);
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // --- Navbar scroll effect ---
            const handleScroll = () => {
                if (window.scrollY > 50) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            };

            if (currentPage === 'index.html') {
                const heroContainer = document.getElementById('hero-container');
                heroContainer.innerHTML = `
                    <div class="hero-slider">
                        <div class="hero-slide" style="background-image: url('https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
                        <div class="hero-slide" style="background-image: url('https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
                        <div class="hero-slide" style="background-image: url('https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
                        <div class="hero-slide" style="background-image: url('https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
                        <div class="hero-slide" style="background-image: url('https://images.pexels.com/photos/1449775/pexels-photo-1449775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');"></div>
                    </div>
                    <div class="hero-content absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <h1 class="text-4xl md:text-5xl font-bold mb-6" data-translate-key="home_hero_title">Bienvenue chez KemdeHolo</h1>
                        <p class="text-xl mb-8" data-translate-key="home_hero_subtitle">Découvrez l'authenticité de l'hospitalité sahélienne</p>
                        <a href="contact.html" class="btn-primary" data-translate-key="home_hero_button">Nous contacter</a>
                    </div>
                `;
                $('.hero-slider').slick({
                    dots: true, arrows: false, infinite: true, speed: 1000,
                    fade: true, autoplay: true, autoplaySpeed: 7000, cssEase: 'linear'
                });
                window.addEventListener('scroll', handleScroll);
                handleScroll();
            } else {
                // Pour les autres pages que l'accueil, on ajoute un espace en haut pour compenser le header fixe
                if (currentPage !== 'index.html') {
                    const mainContent = document.querySelector('body > section:first-of-type, body > main:first-of-type'); // On cible la première section ou le main
                    if(mainContent && !mainContent.classList.contains('hero-section')) { // On vérifie que ce n'est PAS une hero-section
                        mainContent.style.paddingTop = `${mainHeader.offsetHeight}px`;
                    }
                    mainHeader.classList.add('scrolled'); // Reste noir sur les autres pages
                }
            }
        }
    };

    initializeComponents();

    // --- Animation au défilement (Scroll Reveal) ---
    const elementsToReveal = document.querySelectorAll(".scroll-reveal");
    if (elementsToReveal.length > 0) {
        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            elementsToReveal.forEach((el, index) => {
                const elementTop = el.getBoundingClientRect().top;
                // L'élément devient visible un peu avant d'atteindre le bas de l'écran
                if (elementTop < windowHeight - 80) { 
                    // Ajout d'un délai pour un effet d'enchaînement subtil
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, 100 * (index % 5)); // Décalage basé sur l'index de l'élément
                }
            });
        };
        window.addEventListener("scroll", revealOnScroll);
        revealOnScroll(); // Révéler les éléments déjà visibles au chargement
    }

    // --- Animation des compteurs ---
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const animateCountUp = (el) => {
            const target = +el.getAttribute('data-target');
            const duration = 2000; // 2 secondes
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            let frame = 0;

            const counter = setInterval(() => {
                frame++;
                const progress = frame / totalFrames;
                const currentCount = Math.round(target * progress);

                if (el.innerText.includes('+')) {
                    el.innerText = `${currentCount}+`;
                } else {
                    el.innerText = currentCount;
                }

                if (frame === totalFrames) {
                    clearInterval(counter);
                }
            }, frameDuration);
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    // --- Gestion des Témoignages (Slider et Modale) ---
    const testimonialSliderWrapper = document.getElementById('testimonial-slider-wrapper');
    if (testimonialSliderWrapper) {
        const category = testimonialSliderWrapper.dataset.category || '';

        const chargerTemoignages = async (categorie) => {
            try {
                let url = '/api/testimonials';
                if (categorie) {
                    url += `?category=${categorie}`;
                }
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erreur de chargement des témoignages.');
                const testimonials = await response.json();

                const sliderContent = document.getElementById('testimonial-slider-content');
                const sliderNav = document.getElementById('testimonial-slider-nav');

                if (!testimonials || testimonials.length === 0) {
                    if (categorie) {
                        testimonialSliderWrapper.innerHTML = `<p class="text-center text-white/70">Aucun témoignage pour la catégorie "${categorie}" pour le moment.</p>`;
                    } else {
                        testimonialSliderWrapper.innerHTML = `<p class="text-center text-white/70">Aucun témoignage pour le moment.</p>`;
                    }
                    testimonialSliderWrapper.classList.remove('hidden');
                    return;
                }

                sliderContent.innerHTML = testimonials.map(t => {
                    // Générer les étoiles en fonction de la note
                    const stars = Array.from({ length: 5 }, (_, i) => 
                        `<i class="fas fa-star ${i < t.rating ? 'text-yellow-400' : 'text-gray-600'}"></i>`
                    ).join('');

                    return `
                        <div class="testimonial-item">
                            <img src="${t.image || 'images/placeholder-avatar.png'}" alt="${t.name}" class="author-image">
                            <div class="testimonial-bubble">
                                <p>"${t.quote}"</p>
                            </div>
                            <div class="testimonial-rating">${stars}</div> 
                            <span class="author-name">${t.name}</span>
                        </div>
                    `;
                }).join('');

                sliderNav.innerHTML = testimonials.map(t => `
                    <div>
                        <img src="${t.image || 'images/placeholder-avatar.png'}" alt="${t.name}" class="author-image-nav">
                    </div>
                `).join('');

                // S'assurer que jQuery et Slick sont chargés
                if (typeof $ !== 'undefined' && $.fn.slick) {
                    $('#testimonial-slider-content').slick({
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        arrows: false,
                        asNavFor: '#testimonial-slider-nav',
                        autoplay: true,
                        autoplaySpeed: 7000, // Ralentit le défilement de 5s à 7s
                        pauseOnHover: true,
                        responsive: [
                            { breakpoint: 768, settings: { slidesToShow: 1 } }
                        ]
                    });
                    $('#testimonial-slider-nav').slick({
                        slidesToShow: Math.min(5, testimonials.length), // Affiche jusqu'à 5 avatars, ou moins si pas assez de témoignages
                        slidesToScroll: 1, asNavFor: '#testimonial-slider-content', dots: false, centerMode: true, focusOnSelect: true, arrows: false
                    });
                    testimonialSliderWrapper.classList.remove('hidden');

                    // Fonction pour égaliser la hauteur des témoignages
                    const equalizeTestimonialHeights = () => {
                        let maxHeight = 0;
                        const $testimonials = $('#testimonial-slider-content .testimonial-item');
                        $testimonials.css('height', 'auto'); // Réinitialiser la hauteur
                        $testimonials.each(function() {
                            if ($(this).height() > maxHeight) {
                                maxHeight = $(this).height();
                            }
                        });
                        $testimonials.css('height', maxHeight + 'px');
                    };

                    // Appliquer l'égalisation au chargement et lors du redimensionnement
                    equalizeTestimonialHeights();
                    $(window).on('resize', equalizeTestimonialHeights);
                    $('#testimonial-slider-content').on('setPosition', equalizeTestimonialHeights); // Événement Slick après changement de slide
                } else {
                    console.error("jQuery or Slick Carousel is not loaded.");
                }
            } catch (error) {
                console.error(error);
                testimonialSliderWrapper.innerHTML = `<p class="text-center text-yellow-400">${error.message}</p>`;
                testimonialSliderWrapper.classList.remove('hidden');
            }
        };
        chargerTemoignages(category);
    }

    // --- Modale pour laisser un témoignage ---
    const showFormBtn = document.getElementById('show-testimonial-form-btn');
    const testimonialModal = document.getElementById('testimonial-modal');
    const closeBtn = document.getElementById('close-testimonial-modal-btn');
    const testimonialForm = document.getElementById('public-testimonial-form');

    if (showFormBtn && testimonialModal && closeBtn) {
        showFormBtn.addEventListener('click', () => {
            testimonialModal.classList.remove('hidden');
            testimonialModal.classList.add('flex');
        });
        closeBtn.addEventListener('click', () => {
            testimonialModal.classList.add('hidden');
            testimonialModal.classList.remove('flex');
        });
    }

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const messageDiv = document.getElementById('testimonial-form-message');
            const formData = {
                name: document.getElementById('public-testimonial-name').value,
                category: document.getElementById('public-testimonial-category').value,
                quote: document.getElementById('public-testimonial-quote').value,
                rating: document.querySelector('input[name="rating"]:checked')?.value
            };

            try {
                const response = await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'Une erreur est survenue.');
                messageDiv.textContent = result.message;
                messageDiv.className = 'bg-green-100 text-green-800 p-3 rounded-md text-center font-bold';
                messageDiv.classList.remove('hidden');
                testimonialForm.reset();
            } catch (error) {
                messageDiv.textContent = `Erreur: ${error.message}`;
                messageDiv.className = 'bg-red-100 text-red-800 p-3 rounded-md text-center font-bold';
                messageDiv.classList.remove('hidden');
            }
        });
    }
});