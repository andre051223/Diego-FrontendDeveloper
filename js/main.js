// Smooth scrolling para los enlaces de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Ajuste del offset para navegación fija
                const offset = window.innerWidth <= 768 ? 80 : 50;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de aparición para las secciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar todas las secciones principales
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Efecto hover para proyectos (solo en dispositivos no táctiles)
    const projectLinks = document.querySelectorAll('.projects a, .projects-2 a');
    
    if (!('ontouchstart' in window)) {
        projectLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Mejoras para dispositivos táctiles
    if ('ontouchstart' in window) {
        projectLinks.forEach(link => {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(1.02)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
    // Validación simple para botones de contacto
    const contactButtons = document.querySelectorAll('.contacto button');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Agregar efecto de clic
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Navbar activo según la sección visible
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Optimización de rendimiento para móviles
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Usar debounce para eventos de scroll en móviles
    if (window.innerWidth <= 768) {
        window.removeEventListener('scroll', updateActiveNav);
        window.addEventListener('scroll', debounce(updateActiveNav, 100));
    }

    // Detección de orientación para móviles
    function handleOrientationChange() {
        setTimeout(() => {
            // Recalcular alturas después del cambio de orientación
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }

    window.addEventListener('orientationchange', handleOrientationChange);

    // Prevenir zoom en inputs en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name=viewport]');
        if (viewport) {
            viewport.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
        }
    }
});

// Función para mostrar un mensaje de éxito al hacer clic en contacto
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        ">
            ${message}
        </div>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}
