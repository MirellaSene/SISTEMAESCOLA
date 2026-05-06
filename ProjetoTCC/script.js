/**
 * Zeloos - Script Principal
 * Versão 3.0 - Design Elegante Vermelho
 */

'use strict';

// ==================== UTILITÁRIOS ====================

/**
 * Máscaras para inputs
 */
const Mascaras = {
    cpf: (value) => {
        return value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },
    
    telefone: (value) => {
        return value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    },
    
    cep: (value) => {
        return value.replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    },
    
    cartao: (value) => {
        return value.replace(/\D/g, '')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})(\d)/, '$1 $2')
            .replace(/(\d{4})\d+?$/, '$1');
    },
    
    validade: (value) => {
        return value.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\/\d{2})\d+?$/, '$1');
    }
};

/**
 * Formatação de valores monetários
 */
const Formatter = {
    moeda: (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);
    },
    
    data: (data) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).format(data);
    },
    
    dataExtensa: (data) => {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(data);
    }
};

// ==================== APLICAÇÃO PRINCIPAL ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Zeloos Elegance - versão 3.0 carregada');
    
    // Criar partículas decorativas
    createParticles();
    
    // Inicializar módulos
    initMascaras();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initDepoimentos();
    initCompra();
    initModelos();
    initParallax();
    initCounters();
});

// ==================== PARTÍCULAS DECORATIVAS ====================

function createParticles() {
    // Verifica se já existe container de partículas
    if (document.querySelector('.particles-container')) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'var(--accent)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animation = `particle-float ${15 + Math.random() * 20}s linear infinite`;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.opacity = 0.1 + Math.random() * 0.2;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// ==================== MÓDULO DE MÁSCARAS ====================

function initMascaras() {
    const inputs = {
        cpf: document.getElementById('cpf'),
        telefone: document.getElementById('telefone'),
        cep: document.getElementById('cep'),
        cartao: document.getElementById('cartaoNumero'),
        validade: document.getElementById('cartaoValidade')
    };
    
    Object.entries(inputs).forEach(([tipo, input]) => {
        if (input && !input.hasAttribute('data-mask')) {
            input.setAttribute('data-mask', 'true');
            input.addEventListener('input', (e) => {
                e.target.value = Mascaras[tipo](e.target.value);
            });
            
            // Aplica máscara inicial se houver valor
            if (input.value) {
                input.value = Mascaras[tipo](input.value);
            }
        }
    });
}

// ==================== MÓDULO DE MENU MOBILE ====================

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navWrapper = document.getElementById('navWrapper');
    
    if (menuBtn && navWrapper) {
        menuBtn.addEventListener('click', () => {
            navWrapper.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            const isExpanded = navWrapper.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
            
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navWrapper.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navWrapper.classList.contains('active')) {
                navWrapper.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ==================== MÓDULO DE SCROLL SUAVE ====================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== MÓDULO DE ANIMAÇÕES ====================

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.recurso-card, .modelo-card, .depoimento-card, .modelo-detalhe-card, .hero-texto > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// ==================== MÓDULO DE PARALLAX ====================

function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                const heroImage = document.querySelector('.hero-imagem');
                
                if (hero && heroImage) {
                    heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==================== MÓDULO DE COUNTERS ====================

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.dataset.count);
                    let current = 0;
                    const increment = target / 50;
                    let animationFrame;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            animationFrame = requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                            cancelAnimationFrame(animationFrame);
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
}

// ==================== MÓDULO DE DEPOIMENTOS ====================

function initDepoimentos() {
    const container = document.getElementById('depoimentos-grid');
    if (!container) return;
    
    // Verifica se já tem conteúdo
    if (container.children.length > 0) return;
    
    const depoimentos = [
        {
            nome: 'Ana Silva',
            idade: '34 anos',
            texto: 'Comprei para minha mãe e já me salvou duas vezes! Ela se perdeu no mercado e consegui achar rapidinho. A pulseira é linda e discreta.',
            avatar: '👩',
            cor: 'var(--primary)'
        },
        {
            nome: 'Carlos Santos',
            idade: '42 anos',
            texto: 'Meu filho tem 7 anos e agora posso deixar ele brincar no condomínio com mais tranquilidade. O app é muito intuitivo e a bateria dura demais!',
            avatar: '👨',
            cor: 'var(--accent)'
        },
        {
            nome: 'Mariana Costa',
            idade: '28 anos',
            texto: 'Uso no meu avô que tem Alzheimer. A bateria dura super bem e o alerta de queda já avisou a família uma vez. Produto excelente!',
            avatar: '👩‍🦰',
            cor: 'var(--primary-light)'
        },
        {
            nome: 'Roberto Mendes',
            idade: '51 anos',
            texto: 'Produto de altíssima qualidade. A localização é precisa e o design é tão elegante que parece uma joia. Recomendo para toda família!',
            avatar: '👨‍🦳',
            cor: 'var(--accent-dark)'
        }
    ];
    
    container.innerHTML = depoimentos.map((dep, index) => `
        <div class="depoimento-card" style="animation-delay: ${index * 0.2}s">
            <i class="fas fa-quote-left" aria-hidden="true"></i>
            <p>"${dep.texto}"</p>
            <div class="depoimento-autor">
                <div class="avatar" style="background: ${dep.cor};" aria-hidden="true">
                    ${dep.avatar}
                </div>
                <div class="autor-info">
                    <h4>${dep.nome}</h4>
                    <span>${dep.idade}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== MÓDULO DE COMPRA ====================

function initCompra() {
    if (!document.querySelector('.pagina-compra')) return;
    
    console.log('💰 Página de compra elegante inicializada');
    
    const urlParams = new URLSearchParams(window.location.search);
    const produto = urlParams.get('produto') || 'kids';
    const precoBase = parseFloat(urlParams.get('preco') || '299');
    
    const cartaoArea = document.getElementById('cartao-area');
    const pixArea = document.getElementById('pix-area');
    const boletoArea = document.getElementById('boleto-area');
    const pixRadio = document.getElementById('pixRadio');
    const boletoRadio = document.querySelector('input[value="boleto"]');
    const cartaoRadio = document.querySelector('input[value="cartao"]');
    const buscarBtn = document.getElementById('buscarCep');
    const copiarBtn = document.getElementById('copiarPix');
    const formCompra = document.getElementById('formCompra');
    const modal = document.getElementById('modalComprovante');
    const closeBtn = document.querySelector('.close');
    const btnFinalizar = document.getElementById('btnFinalizar');
    
    let pixTimerInterval = null;
    
    function atualizarResumo(comDesconto = false) {
        const produtoResumo = document.getElementById('produto-resumo');
        const valorTotal = document.getElementById('valor-total');
        const parcelasTexto = document.getElementById('parcelasTexto');
        
        if (!produtoResumo || !valorTotal) return;
        
        const precoFinal = comDesconto ? precoBase * 0.95 : precoBase;
        const valorParcela = precoFinal / 12;
        
        const icone = produto === 'kids' ? 'child' : produto === 'senior' ? 'user' : 'heart';
        const nomeProduto = produto.charAt(0).toUpperCase() + produto.slice(1);
        
        produtoResumo.innerHTML = `
            <div class="produto-imagem-resumo">
                <div class="miniatura">
                    <i class="fas fa-${icone}" aria-hidden="true"></i>
                </div>
                <div>
                    <strong>Pulseira ${nomeProduto}</strong>
                    <p class="produto-detalhe">modelo ${produto} • 1 unidade</p>
                </div>
            </div>
            <div class="subtotal">
                <span>subtotal</span>
                <span>${Formatter.moeda(precoBase)}</span>
            </div>
            ${comDesconto ? `
            <div class="desconto">
                <span>desconto PIX (5%)</span>
                <span>- ${Formatter.moeda(precoBase * 0.05)}</span>
            </div>
            ` : ''}
        `;
        
        valorTotal.textContent = Formatter.moeda(precoFinal);
        
        if (parcelasTexto) {
            parcelasTexto.innerHTML = `até 12x sem juros de <strong>${Formatter.moeda(valorParcela)}</strong>`;
        }
    }
    
    function iniciarTimerPix() {
        const timerElement = document.getElementById('pixTimer');
        if (!timerElement) return;
        
        if (pixTimerInterval) clearInterval(pixTimerInterval);
        
        let minutos = 15;
        let segundos = 0;
        
        timerElement.innerHTML = '⏰ pagamento PIX expira em 15:00';
        timerElement.style.background = 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)';
        
        pixTimerInterval = setInterval(() => {
            if (segundos === 0) {
                if (minutos === 0) {
                    clearInterval(pixTimerInterval);
                    timerElement.innerHTML = '⏰ PIX expirado, escolha outra forma de pagamento';
                    timerElement.style.background = 'var(--error)';
                    
                    if (cartaoRadio) {
                        cartaoRadio.checked = true;
                        cartaoRadio.dispatchEvent(new Event('change'));
                    }
                    return;
                }
                minutos--;
                segundos = 59;
            } else {
                segundos--;
            }
            
            timerElement.innerHTML = `⏰ pagamento PIX expira em ${minutos}:${segundos.toString().padStart(2, '0')}`;
        }, 1000);
    }
    
    function pararTimerPix() {
        if (pixTimerInterval) {
            clearInterval(pixTimerInterval);
            pixTimerInterval = null;
        }
    }
    
    async function buscarCep(cep) {
        const cepLimpo = cep.replace(/\D/g, '');
        
        if (cepLimpo.length !== 8) {
            mostrarFeedback('CEP deve ter 8 dígitos', 'error');
            return;
        }
        
        if (buscarBtn) {
            buscarBtn.disabled = true;
            buscarBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> buscando...';
        }
        
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();
            
            if (!data.erro) {
                document.getElementById('rua').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('uf').value = data.uf || '';
                
                if (data.logradouro) {
                    document.getElementById('numero').focus();
                }
                
                mostrarFeedback('CEP encontrado!', 'success');
                
                // Animação de sucesso
                document.querySelectorAll('#rua, #bairro, #cidade, #uf').forEach(input => {
                    input.style.animation = 'glow 1s';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 1000);
                });
            } else {
                mostrarFeedback('CEP não encontrado', 'error');
            }
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
            mostrarFeedback('Erro ao buscar CEP', 'error');
        } finally {
            if (buscarBtn) {
                buscarBtn.disabled = false;
                buscarBtn.innerHTML = 'buscar';
            }
        }
    }
    
    function mostrarFeedback(mensagem, tipo) {
        const feedback = document.createElement('div');
        feedback.className = `feedback-message ${tipo}-feedback`;
        feedback.textContent = mensagem;
        feedback.setAttribute('role', 'alert');
        feedback.style.animation = 'fadeInUp 0.3s';
        
        const feedbackAnterior = document.querySelector('.feedback-message');
        if (feedbackAnterior) feedbackAnterior.remove();
        
        const cepGroup = document.querySelector('.cep-group');
        if (cepGroup) {
            cepGroup.appendChild(feedback);
            setTimeout(() => {
                feedback.style.animation = 'fadeOut 0.3s';
                setTimeout(() => feedback.remove(), 300);
            }, 3000);
        }
    }
    
    function validarFormulario() {
        const campos = [
            'nome', 'cpf', 'email', 'telefone', 'cep', 
            'rua', 'numero', 'bairro', 'cidade', 'uf'
        ];
        
        let valido = true;
        
        campos.forEach(campo => {
            const input = document.getElementById(campo);
            if (input && input.required && !input.value.trim()) {
                input.classList.add('error');
                input.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    input.style.animation = '';
                }, 500);
                valido = false;
            } else if (input) {
                input.classList.remove('error');
            }
        });
        
        const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked')?.value;
        
        if (pagamentoSelecionado === 'cartao') {
            const cartaoCampos = ['cartaoNumero', 'cartaoValidade', 'cartaoCvv', 'cartaoNome'];
            cartaoCampos.forEach(campo => {
                const input = document.getElementById(campo);
                if (input && !input.value.trim()) {
                    input.classList.add('error');
                    input.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                    valido = false;
                } else if (input) {
                    input.classList.remove('error');
                }
            });
        }
        
        if (!valido) {
            mostrarFeedback('Preencha todos os campos obrigatórios', 'error');
        }
        
        return valido;
    }
    
    function preencherComprovante(pagamento) {
        const data = new Date();
        document.getElementById('dataPedido').textContent = Formatter.dataExtensa(data);
        
        let tipoPagamento = '';
        let precoFinal = precoBase;
        
        if (pagamento === 'pix') {
            tipoPagamento = 'PIX (pago)';
            precoFinal = precoBase * 0.95;
        } else if (pagamento === 'boleto') {
            tipoPagamento = 'boleto bancário';
        } else {
            tipoPagamento = 'cartão de crédito';
        }
        
        document.getElementById('tipoPagamento').textContent = tipoPagamento;
        
        const numPedido = 'ZLS' + Math.floor(Math.random() * 10000) + '-' + data.getFullYear();
        document.getElementById('numPedido').textContent = numPedido;
        
        const icone = produto === 'kids' ? 'child' : produto === 'senior' ? 'user' : 'heart';
        const nomeProduto = produto.charAt(0).toUpperCase() + produto.slice(1);
        
        document.getElementById('comprovante-produto').innerHTML = `
            <div class="produto-info">
                <div class="produto-icon">
                    <i class="fas fa-${icone}" aria-hidden="true"></i>
                </div>
                <div class="produto-detalhes">
                    <strong>Pulseira ${nomeProduto}</strong>
                    <p>1 unidade • ${Formatter.moeda(precoBase)}</p>
                </div>
            </div>
            ${pagamento === 'pix' ? `
            <div class="desconto-aplicado">
                <span>Desconto PIX (5%):</span>
                <span>- ${Formatter.moeda(precoBase * 0.05)}</span>
            </div>
            ` : ''}
        `;
        
        const nome = document.getElementById('nome').value;
        const rua = document.getElementById('rua').value;
        const numero = document.getElementById('numero').value;
        const complemento = document.getElementById('complemento').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const uf = document.getElementById('uf').value;
        const cep = document.getElementById('cep').value;
        
        document.getElementById('comprovante-endereco').innerHTML = `
            <p><strong>${nome}</strong></p>
            <p>${rua}, ${numero} ${complemento ? '- ' + complemento : ''}</p>
            <p>${bairro} - ${cidade}/${uf}</p>
            <p>CEP: ${cep}</p>
        `;
        
        document.getElementById('comprovante-total').textContent = Formatter.moeda(precoFinal);
    }
    
    // Event Listeners
    
    // Inicializa com resumo padrão
    atualizarResumo(false);
    
    if (pixRadio) {
        pixRadio.addEventListener('change', function() {
            if (this.checked) {
                pararTimerPix();
                if (cartaoArea) cartaoArea.classList.add('hidden');
                if (boletoArea) boletoArea.classList.add('hidden');
                if (pixArea) pixArea.classList.remove('hidden');
                atualizarResumo(true);
                iniciarTimerPix();
            }
        });
    }
    
    if (cartaoRadio) {
        cartaoRadio.addEventListener('change', function() {
            if (this.checked) {
                pararTimerPix();
                if (cartaoArea) cartaoArea.classList.remove('hidden');
                if (pixArea) pixArea.classList.add('hidden');
                if (boletoArea) boletoArea.classList.add('hidden');
                atualizarResumo(false);
            }
        });
    }
    
    if (boletoRadio) {
        boletoRadio.addEventListener('change', function() {
            if (this.checked) {
                pararTimerPix();
                if (cartaoArea) cartaoArea.classList.add('hidden');
                if (pixArea) pixArea.classList.add('hidden');
                if (boletoArea) boletoArea.classList.remove('hidden');
                atualizarResumo(false);
            }
        });
    }
    
    if (buscarBtn) {
        buscarBtn.addEventListener('click', () => {
            const cep = document.getElementById('cep').value;
            buscarCep(cep);
        });
        
        document.getElementById('cep')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                buscarCep(e.target.value);
            }
        });
    }
    
    if (copiarBtn) {
        copiarBtn.addEventListener('click', async function() {
            const codigoPix = document.getElementById('pixCodigo').textContent;
            
            try {
                await navigator.clipboard.writeText(codigoPix);
                const textoOriginal = this.innerHTML;
                this.innerHTML = '✓ copiado!';
                this.classList.add('copiado');
                this.style.animation = 'pulse 0.5s';
                
                setTimeout(() => {
                    this.innerHTML = textoOriginal;
                    this.classList.remove('copiado');
                    this.style.animation = '';
                }, 2000);
            } catch (err) {
                console.error('Erro ao copiar:', err);
                alert('Não foi possível copiar. Selecione o código manualmente.');
            }
        });
    }
    
    if (formCompra) {
        formCompra.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validarFormulario()) return;
            
            const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked')?.value || 'cartao';
            
            if (btnFinalizar) {
                btnFinalizar.disabled = true;
                btnFinalizar.innerHTML = '<span class="spinner" aria-hidden="true"></span> processando...';
            }
            
            setTimeout(() => {
                preencherComprovante(pagamentoSelecionado);
                
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                    
                    // Animação de entrada do modal
                    const modalContent = document.querySelector('.modal-content');
                    if (modalContent) {
                        modalContent.style.animation = 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    }
                }
                
                if (btnFinalizar) {
                    btnFinalizar.disabled = false;
                    btnFinalizar.innerHTML = 'finalizar compra';
                }
            }, 1500);
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                window.location.href = 'index.html';
            }
        });
    }
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                window.location.href = 'index.html';
            }
        }
    });
    
    const btnCompartilhar = document.getElementById('btnCompartilhar');
    if (btnCompartilhar) {
        btnCompartilhar.addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: 'Comprei na Zeloos!',
                    text: 'Acabei de comprar minha pulseira localizadora. Super recomendo!',
                    url: 'https://zeloos.com.br'
                }).catch(() => {
                    alert('Link copiado! Compartilhe com seus amigos.');
                });
            } else {
                alert('Link copiado! Compartilhe com seus amigos.');
            }
        });
    }
}

// ==================== MÓDULO DE MODELOS ====================

function initModelos() {
    if (!document.querySelector('.pagina-modelos-banner')) return;
    
    console.log('📱 Página de modelos elegante inicializada');
    
    const filtros = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.modelo-detalhe-card');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', () => {
            filtros.forEach(f => {
                f.classList.remove('active');
                f.setAttribute('aria-selected', 'false');
            });
            
            filtro.classList.add('active');
            filtro.setAttribute('aria-selected', 'true');
            
            const categoria = filtro.dataset.filtro;
            
            cards.forEach(card => {
                if (categoria === 'todos' || card.dataset.categoria === categoria) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.animation = 'fadeInUp 0.5s';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');
        
        if (pergunta) {
            pergunta.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    const p = i.querySelector('.faq-pergunta');
                    if (p) p.setAttribute('aria-expanded', 'false');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    pergunta.setAttribute('aria-expanded', 'true');
                    
                    // Animação de abertura
                    const resposta = item.querySelector('.faq-resposta');
                    if (resposta) {
                        resposta.style.animation = 'slideDown 0.3s';
                        setTimeout(() => {
                            resposta.style.animation = '';
                        }, 300);
                    }
                }
            });
            
            pergunta.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    pergunta.click();
                }
            });
        }
    });
}