document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const button = this.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = 'Enviando...';
    button.disabled = true;

    setTimeout(() => {
        button.textContent = 'Mensagem Enviada!';
        button.style.background = 'var(--gradient-accent)';

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = 'var(--gradient-primary)';
            this.reset();
        }, 2000);
    }, 1500);
});

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalNumber = parseInt(stat.textContent);
                animateNumber(stat, finalNumber);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

function animateNumber(element, finalNumber) {
    let currentNumber = 0;
    const increment = finalNumber / 30;
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= finalNumber) {
            currentNumber = finalNumber;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentNumber) + (element.textContent.includes('+') ? '+' : '');
    }, 50);
}

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav__list');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav__list.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            gap: 2rem;
            z-index: 999;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});
