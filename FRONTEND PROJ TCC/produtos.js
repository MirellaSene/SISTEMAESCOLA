// Dados dos produtos com cores vibrantes
const produtos = {
    kids: {
        nome: "SafeTrack Kids",
        descricao: "🌈 Pulseira de localização projetada especialmente para crianças. Material hipoalergênico, design colorido e divertido, com todas as funcionalidades de segurança.",
        preco: "R$ 249,90",
        precoNumero: 249.90,
        imagem: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: [
            "Bateria: Até 5 dias de uso",
            "Material: Silicone hipoalergênico colorido",
            "Conectividade: GPS + WiFi + Bluetooth 5.0",
            "Resistência: Água (IP68)",
            "Tamanho: Ajustável (14-18 cm)",
            "Peso: Apenas 25g",
            "Cores: Azul, Rosa, Verde, Amarelo"
        ]
    },
    adulto: {
        nome: "SafeTrack Adulto",
        descricao: "✨ Pulseira premium para adultos e idosos, com botão de emergência, monitoramento contínuo 24/7 e design elegante e discreto.",
        preco: "R$ 299,90",
        precoNumero: 299.90,
        imagem: "https://images.unsplash.com/photo-1584917865447-5d7a8b7d8596?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: [
            "Bateria: Até 7 dias de uso",
            "Material: Silicone premium",
            "Conectividade: GPS + WiFi + Bluetooth 5.0",
            "Resistência: Água (IP68)",
            "Botão de emergência: Sim",
            "Monitoramento: 24/7",
            "Cores: Preto, Prata, Dourado"
        ]
    },
    pet: {
        nome: "SafeTrack Pet",
        descricao: "🐾 Coleira inteligente para seu pet nunca mais se perder. Leve, resistente e à prova d'água, com bateria de longa duração.",
        preco: "R$ 199,90",
        precoNumero: 199.90,
        imagem: "https://images.unsplash.com/photo-1553545204-5336d2207f64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        specs: [
            "Bateria: Até 10 dias de uso",
            "Material: Nylon resistente",
            "Conectividade: GPS + Bluetooth 5.0",
            "Resistência: Água (IP67)",
            "Tamanho: Ajustável (25-45 cm)",
            "Peso: 35g",
            "Cores: Vermelho, Azul, Preto"
        ]
    }
};

// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Filtros de produtos com efeitos
const filtroTags = document.querySelectorAll('.filtro-tag');
const produtoCards = document.querySelectorAll('.produto-card');

filtroTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Remover active de todos
        filtroTags.forEach(t => t.classList.remove('active'));
        // Adicionar ao clicado
        tag.classList.add('active');
        
        const modelo = tag.dataset.modelo;
        
        // Filtrar produtos com animação
        produtoCards.forEach(card => {
            if (modelo === 'todos' || card.dataset.modelo === modelo) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Atualizar detalhes do produto
function atualizarDetalhesProduto(modelo) {
    const produto = produtos[modelo];
    
    if (!produto) return;
    
    // Atualizar elementos com efeito fade
    const elements = {
        nome: document.getElementById('produto-nome'),
        desc: document.getElementById('produto-desc'),
        img: document.getElementById('produto-img'),
        preco: document.getElementById('produto-preco')
    };
    
    // Aplicar fade out/in
    Object.values(elements).forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'scale(0.95)';
        }
    });
    
    setTimeout(() => {
        elements.nome.textContent = produto.nome;
        elements.desc.textContent = produto.descricao;
        elements.img.src = produto.imagem;
        elements.img.alt = produto.nome;
        elements.preco.textContent = produto.preco;
        
        // Atualizar specs
        const specsList = document.getElementById('produto-specs');
        specsList.innerHTML = '';
        produto.specs.forEach(spec => {
            const li = document.createElement('li');
            const [label, value] = spec.split(':');
            li.innerHTML = `<strong>${label}:</strong> ${value}`;
            li.style.animation = 'fadeInUp 0.5s';
            specsList.appendChild(li);
        });
        
        // Atualizar mini imagens active
        document.querySelectorAll('.mini-img').forEach(img => {
            img.classList.remove('active');
            if (img.dataset.img === modelo) {
                img.classList.add('active');
            }
        });
        
        // Fade in
        Object.values(elements).forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'scale(1)';
            }
        });
    }, 300);
}

// Selecionar produto com efeito
document.querySelectorAll('.btn-selecionar').forEach(btn => {
    btn.addEventListener('click', function() {
        const modelo = this.dataset.produto;
        atualizarDetalhesProduto(modelo);
        
        // Scroll suave para detalhes
        document.querySelector('.produto-detalhe').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Feedback visual com confete
        this.innerHTML = '<i class="fas fa-check"></i> Selecionado!';
        this.style.background = 'var(--gradient-secondary)';
        this.style.transform = 'scale(1.1)';
        
        // Criar mini confete
        for (let i = 0; i < 5; i++) {
            const confete = document.createElement('div');
            confete.style.position = 'absolute';
            confete.style.width = '10px';
            confete.style.height = '10px';
            confete.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confete.style.borderRadius = '50%';
            confete.style.left = '50%';
            confete.style.top = '50%';
            confete.style.animation = `confete ${0.5 + Math.random() * 0.5}s ease-out forwards`;
            this.appendChild(confete);
            
            setTimeout(() => confete.remove(), 1000);
        }
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-shopping-cart"></i> Selecionar';
            this.style.background = '';
            this.style.transform = '';
        }, 2000);
    });
});

// Visualizar produto (modal)
const modal = document.getElementById('modal-produto');
const modalImg = document.getElementById('modal-img');
const modalClose = document.querySelector('.modal-close');

document.querySelectorAll('.btn-visualizar').forEach(btn => {
    btn.addEventListener('click', function() {
        const modelo = this.dataset.produto;
        const produto = produtos[modelo];
        
        if (produto) {
            modalImg.src = produto.imagem;
            modalImg.alt = produto.nome;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Efeito de zoom na imagem
            modalImg.style.transform = 'scale(0.9)';
            setTimeout(() => {
                modalImg.style.transform = 'scale(1)';
            }, 100);
        }
    });
});

// Fechar modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Mini imagens
document.querySelectorAll('.mini-img').forEach(img => {
    img.addEventListener('click', function() {
        const modelo = this.dataset.img;
        
        // Efeito de clique
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // Atualizar active
        document.querySelectorAll('.mini-img').forEach(i => {
            i.classList.remove('active');
        });
        this.classList.add('active');
        
        // Atualizar detalhes
        atualizarDetalhesProduto(modelo);
    });
});

// Controle de quantidade
let quantidade = 1;
const qtdValue = document.getElementById('qtd-value');
const qtdPlus = document.getElementById('qtd-plus');
const qtdMinus = document.getElementById('qtd-minus');

if (qtdPlus && qtdMinus) {
    qtdPlus.addEventListener('click', () => {
        if (quantidade < 10) {
            quantidade++;
            qtdValue.textContent = quantidade;
            
            // Efeito
            qtdValue.style.transform = 'scale(1.2)';
            setTimeout(() => {
                qtdValue.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    qtdMinus.addEventListener('click', () => {
        if (quantidade > 1) {
            quantidade--;
            qtdValue.textContent = quantidade;
            
            // Efeito
            qtdValue.style.transform = 'scale(0.8)';
            setTimeout(() => {
                qtdValue.style.transform = 'scale(1)';
            }, 200);
        }
    });
}

// Favoritar produto
const btnFavorito = document.querySelector('.btn-favorito');
if (btnFavorito) {
    btnFavorito.addEventListener('click', function() {
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-heart" style="animation: heartBeat 0.5s;"></i> Favoritado';
            
            // Salvar no localStorage
            localStorage.setItem('favorito', 'true');
            
            // Efeito de corações
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('i');
                heart.className = 'fas fa-heart';
                heart.style.position = 'absolute';
                heart.style.color = '#ef4444';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.animation = `floatHeart ${0.8 + Math.random() * 0.5}s ease-out forwards`;
                heart.style.fontSize = `${10 + Math.random() * 20}px`;
                this.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1000);
            }
        } else {
            this.innerHTML = '<i class="far fa-heart"></i> Favoritar';
            localStorage.removeItem('favorito');
        }
    });
    
    // Verificar favorito salvo
    if (localStorage.getItem('favorito') === 'true') {
        btnFavorito.classList.add('active');
        btnFavorito.innerHTML = '<i class="fas fa-heart"></i> Favoritado';
    }
}

// Verificar URL parameters
const urlParams = new URLSearchParams(window.location.search);
const modeloFromUrl = urlParams.get('modelo');

if (modeloFromUrl && produtos[modeloFromUrl]) {
    // Scroll para detalhes após carregar
    setTimeout(() => {
        atualizarDetalhesProduto(modeloFromUrl);
        document.querySelector('.produto-detalhe').scrollIntoView({
            behavior: 'smooth'
        });
    }, 500);
}

// Animar cards ao rolar
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.produto-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confete {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + ${Math.random() * 100 - 50}px), calc(-50% - ${Math.random() * 100}px)) scale(0); opacity: 0; }
    }
    
    @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.3); }
        50% { transform: scale(1); }
        75% { transform: scale(1.2); }
    }
    
    @keyframes floatHeart {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(calc(-50% + ${Math.random() * 200 - 100}px), calc(-50% - 200px)) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar com produto Kids
document.addEventListener('DOMContentLoaded', () => {
    if (!modeloFromUrl) {
        atualizarDetalhesProduto('kids');
    }
    
    console.log('🚀 Página de produtos carregada com cores vibrantes!');
    
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
        toast.style.animation = 'fadeInUp 0.5s';
        toast.innerHTML = '<i class="fas fa-gem"></i> Escolha sua pulseira favorita!';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }, 1000);
});