// Menu Mobile com efeitos
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Efeito de shake no botão
        menuToggle.style.animation = 'none';
        setTimeout(() => {
            menuToggle.style.animation = 'pulse 0.5s';
        }, 10);
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Scroll suave para âncoras com efeito
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Efeito de highlight no elemento alvo
            targetElement.style.animation = 'pulse 1s';
            setTimeout(() => {
                targetElement.style.animation = '';
            }, 1000);
        }
    });
});

// Highlight da navegação ao rolar
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Animação dos elementos ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Adicionar efeito de brilho
            entry.target.style.boxShadow = 'var(--shadow-lg)';
            setTimeout(() => {
                entry.target.style.boxShadow = 'var(--shadow)';
            }, 500);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.passo, .beneficio-card, .modelo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease';
    observer.observe(el);
});

// QR Code interativo com efeitos WOW
const qrPlaceholder = document.querySelector('.qr-placeholder');
if (qrPlaceholder) {
    qrPlaceholder.addEventListener('click', () => {
        qrPlaceholder.style.transform = 'scale(0.9) rotate(-5deg)';
        
        setTimeout(() => {
            qrPlaceholder.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; animation: fadeInUp 0.5s;">
                    <i class="fas fa-check-circle" style="color: #10b981; font-size: 4rem; margin-bottom: 1rem; animation: pulse 1s infinite;"></i>
                    <span style="font-weight: 700; color: white; font-size: 1.2rem;">QR Code Escaneado!</span>
                    <small style="color: rgba(255,255,255,0.9);">Pulseira ativada com sucesso</small>
                </div>
            `;
            
            qrPlaceholder.style.background = 'var(--gradient-secondary)';
            qrPlaceholder.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                qrPlaceholder.style.transform = 'scale(1)';
            }, 200);
            
        }, 300);
        
        setTimeout(() => {
            qrPlaceholder.innerHTML = `
                <i class="fas fa-qrcode" style="animation: pulse 2s infinite;"></i>
                <span>QR CODE</span>
                <small>Clique para simular ativação</small>
            `;
            qrPlaceholder.style.background = 'var(--gradient-primary)';
            qrPlaceholder.style.transform = 'scale(1)';
        }, 3000);
    });
}

// Efeito de digitação no título
const heroTitle = document.querySelector('.hero-title');
if (heroTitle && window.innerWidth > 768) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        } else {
            // Efeito de brilho ao finalizar
            heroTitle.style.textShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
            setTimeout(() => {
                heroTitle.style.textShadow = '';
            }, 500);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Efeito parallax suave com movimento 3D
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContent = document.querySelector('.hero-content');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.05}px) rotate(${scrolled * 0.01}deg)`;
    }
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.02}px)`;
    }
});

// Efeito de hover nos cards
document.querySelectorAll('.beneficio-card, .modelo-card, .passo').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Prevenir envio de formulários
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Efeito de sucesso
        const btn = form.querySelector('button[type="submit"]');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Enviado!';
            btn.style.background = 'var(--gradient-secondary)';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
            }, 2000);
        }
        
        alert('Formulário enviado com sucesso! (Modo demonstração)');
    });
});

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target) + '+';
            element.style.animation = 'pulse 0.5s';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Adicionar estatísticas se existirem
const statElements = document.querySelectorAll('.stat-number');
statElements.forEach(el => {
    const target = parseInt(el.dataset.target) || 1000;
    animateCounter(el, target);
});

// Efeito de partículas no fundo (opcional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 10 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particle.style.pointerEvents = 'none';
        
        hero.appendChild(particle);
    }
}

createParticles();

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SafeTrack - Site carregado com sucesso!');
    console.log('✨ Cores vibrantes ativadas!');
    
    // Adicionar classe loaded para animações
    document.body.classList.add('loaded');
    
    // Efeito de boas-vindas
    setTimeout(() => {
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = 'var(--gradient-primary)';
        toast.style.color = 'white';
        toast.style.padding = '15px 25px';
        toast.style.borderRadius = '50px';
        toast.style.boxShadow = 'var(--shadow-xl)';
        toast.style.zIndex = '9999';
        toast.style.animation = 'fadeInUp 0.5s, pulse 2s infinite';
        toast.innerHTML = '<i class="fas fa-rocket"></i> SafeTrack - Segurança em cores vibrantes!';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s';
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    }, 1000);
});

// Adicionar animação de fadeOut
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
    
    .particle {
        position: absolute;
        pointer-events: none;
        z-index: 1;
    }
`;
document.head.appendChild(style);