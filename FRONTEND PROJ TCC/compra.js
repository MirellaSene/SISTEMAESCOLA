// Dados dos produtos
const produtos = {
    kids: {
        nome: "SafeTrack Kids",
        preco: 249.90,
        imagem: "https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        codigo: "ST-KIDS-001"
    },
    adulto: {
        nome: "SafeTrack Adulto",
        preco: 299.90,
        imagem: "https://images.unsplash.com/photo-1584917865447-5d7a8b7d8596?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        codigo: "ST-ADL-002"
    },
    pet: {
        nome: "SafeTrack Pet",
        preco: 199.90,
        imagem: "https://images.unsplash.com/photo-1553545204-5336d2207f64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
        codigo: "ST-PET-003"
    }
};

// Estado da compra
let estadoCompra = {
    produto: null,
    quantidade: 1,
    frete: 19.90,
    desconto: 0,
    cupomAtivo: null,
    metodoPagamento: 'cartao',
    pedidoNumero: null
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

// Inicializar com produto da URL
function inicializarProduto() {
    const urlParams = new URLSearchParams(window.location.search);
    const modelo = urlParams.get('modelo') || 'adulto';
    
    if (produtos[modelo]) {
        estadoCompra.produto = produtos[modelo];
        atualizarResumo();
    }
}

// Atualizar resumo da compra
function atualizarResumo() {
    if (!estadoCompra.produto) return;
    
    const subtotal = estadoCompra.produto.preco * estadoCompra.quantidade;
    const total = subtotal + estadoCompra.frete - estadoCompra.desconto;
    
    // Atualizar elementos do DOM
    document.getElementById('resumo-produto-img').src = estadoCompra.produto.imagem;
    document.getElementById('resumo-produto-img').alt = estadoCompra.produto.nome;
    document.getElementById('resumo-produto-nome').textContent = estadoCompra.produto.nome;
    document.getElementById('resumo-produto-preco').textContent = `R$ ${estadoCompra.produto.preco.toFixed(2).replace('.', ',')}`;
    
    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('frete-valor').textContent = `R$ ${estadoCompra.frete.toFixed(2).replace('.', ',')}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
    // Atualizar carrinho
    document.querySelector('.carrinho-count').textContent = estadoCompra.quantidade;
}

// Formatação de inputs
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

function formatarTelefone(telefone) {
    telefone = telefone.replace(/\D/g, '');
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2');
    telefone = telefone.replace(/(\d)(\d{4})$/, '$1-$2');
    return telefone;
}

function formatarCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    return cep;
}

function formatarCartao(numero) {
    numero = numero.replace(/\D/g, '');
    numero = numero.replace(/(\d{4})(\d)/, '$1 $2');
    numero = numero.replace(/(\d{4})(\d)/, '$1 $2');
    numero = numero.replace(/(\d{4})(\d)/, '$1 $2');
    return numero.substring(0, 19);
}

function formatarValidade(validade) {
    validade = validade.replace(/\D/g, '');
    if (validade.length >= 2) {
        validade = validade.replace(/^(\d{2})(\d)/, '$1/$2');
    }
    return validade.substring(0, 5);
}

// Aplicar formatação em tempo real
document.getElementById('cpf')?.addEventListener('input', function(e) {
    this.value = formatarCPF(this.value);
});

document.getElementById('telefone')?.addEventListener('input', function(e) {
    this.value = formatarTelefone(this.value);
});

document.getElementById('cep')?.addEventListener('input', function(e) {
    this.value = formatarCEP(this.value);
});

document.getElementById('numero-cartao')?.addEventListener('input', function(e) {
    this.value = formatarCartao(this.value);
});

document.getElementById('validade-cartao')?.addEventListener('input', function(e) {
    this.value = formatarValidade(this.value);
});

// Buscar CEP
document.getElementById('buscar-cep')?.addEventListener('click', buscarCEP);

function buscarCEP() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
        alert('CEP inválido. Digite um CEP com 8 dígitos.');
        return;
    }
    
    // Mostrar loading
    const btnCep = document.getElementById('buscar-cep');
    const originalHtml = btnCep.innerHTML;
    btnCep.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btnCep.disabled = true;
    
    // Usando API pública de CEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (!data.erro) {
                document.getElementById('endereco').value = data.logradouro || '';
                document.getElementById('bairro').value = data.bairro || '';
                document.getElementById('cidade').value = data.localidade || '';
                document.getElementById('estado').value = data.uf || '';
                document.getElementById('numero').focus();
            } else {
                alert('CEP não encontrado. Por favor, preencha manualmente.');
            }
        })
        .catch(error => {
            alert('Erro ao buscar CEP. Preencha manualmente.');
            console.error('Erro:', error);
        })
        .finally(() => {
            btnCep.innerHTML = originalHtml;
            btnCep.disabled = false;
        });
}

// Opções de frete
document.querySelectorAll('input[name="frete"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.id === 'frete-padrao') {
            estadoCompra.frete = 19.90;
        } else if (this.id === 'frete-expresso') {
            estadoCompra.frete = 39.90;
        } else if (this.id === 'frete-gratis') {
            estadoCompra.frete = 0;
        }
        
        // Atualizar visualmente
        document.querySelectorAll('.opcao-frete').forEach(opcao => {
            opcao.classList.remove('selected');
        });
        this.closest('.opcao-frete').classList.add('selected');
        
        atualizarResumo();
    });
});

// Métodos de pagamento
document.querySelectorAll('.metodo-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const metodo = this.dataset.metodo;
        
        // Atualizar tabs
        document.querySelectorAll('.metodo-tab').forEach(t => {
            t.classList.remove('active');
        });
        this.classList.add('active');
        
        // Atualizar conteúdo
        document.querySelectorAll('.metodo-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${metodo}-content`).classList.add('active');
        
        estadoCompra.metodoPagamento = metodo;
    });
});

// Cupom de desconto
document.getElementById('aplicar-cupom')?.addEventListener('click', aplicarCupom);
document.querySelector('.cupom-exemplo')?.addEventListener('click', function() {
    const cupom = this.dataset.cupom;
    document.getElementById('cupom').value = cupom;
    aplicarCupom();
});

function aplicarCupom() {
    const cupomInput = document.getElementById('cupom');
    const cupom = cupomInput.value.toUpperCase();
    
    if (!cupom) {
        alert('Por favor, digite um código de cupom.');
        return;
    }
    
    // Cupons válidos
    const cupons = {
        'SAFETRACK10': 0.10,
        'SEGURANCA5': 0.05,
        'PRIMEIRACOMPRA': 0.15,
        'VIBRANTE20': 0.20
    };
    
    if (cupons[cupom]) {
        const descontoPercentual = cupons[cupom];
        const subtotal = estadoCompra.produto.preco * estadoCompra.quantidade;
        estadoCompra.desconto = subtotal * descontoPercentual;
        estadoCompra.cupomAtivo = cupom;
        
        cupomInput.disabled = true;
        document.getElementById('aplicar-cupom').textContent = 'Aplicado';
        document.getElementById('aplicar-cupom').style.background = 'var(--gradient-secondary)';
        
        alert(`🎉 Cupom aplicado! ${descontoPercentual * 100}% de desconto.`);
        atualizarResumo();
    } else {
        alert('❌ Cupom inválido ou expirado.');
        cupomInput.value = '';
        cupomInput.focus();
    }
}

// Validação do formulário
function validarFormulario() {
    const camposObrigatorios = [
        'nome', 'email', 'telefone', 'cpf', 'cep', 
        'endereco', 'numero', 'bairro', 'cidade', 'estado'
    ];
    
    for (const campoId of camposObrigatorios) {
        const campo = document.getElementById(campoId);
        if (!campo || !campo.value.trim()) {
            alert(`Por favor, preencha o campo: ${campo.previousElementSibling?.textContent || campoId}`);
            campo?.focus();
            return false;
        }
    }
    
    // Validar e-mail
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, digite um e-mail válido.');
        document.getElementById('email').focus();
        return false;
    }
    
    // Validar CPF
    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    if (cpf.length !== 11) {
        alert('Por favor, digite um CPF válido com 11 dígitos.');
        document.getElementById('cpf').focus();
        return false;
    }
    
    // Validar termos
    if (!document.getElementById('aceitar-termos').checked) {
        alert('Você precisa aceitar os Termos de Uso e Política de Privacidade para continuar.');
        return false;
    }
    
    // Validar método de pagamento
    if (estadoCompra.metodoPagamento === 'cartao') {
        const camposCartao = ['numero-cartao', 'nome-cartao', 'validade-cartao', 'cvv-cartao'];
        for (const campoId of camposCartao) {
            const campo = document.getElementById(campoId);
            if (!campo || !campo.value.trim()) {
                alert(`Por favor, preencha todos os dados do cartão.`);
                campo?.focus();
                return false;
            }
        }
        
        // Validar validade
        const validade = document.getElementById('validade-cartao').value;
        const [mes, ano] = validade.split('/');
        const hoje = new Date();
        const anoAtual = hoje.getFullYear() % 100;
        const mesAtual = hoje.getMonth() + 1;
        
        if (parseInt(ano) < anoAtual || (parseInt(ano) === anoAtual && parseInt(mes) < mesAtual)) {
            alert('Cartão com validade vencida.');
            document.getElementById('validade-cartao').focus();
            return false;
        }
    }
    
    return true;
}

// Função para gerar PDF do recibo
function gerarReciboPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cabeçalho
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('SafeTrack', 105, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Comprovante de Compra', 105, 35, { align: 'center' });
    
    // Dados do pedido
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Dados do Pedido', 20, 60);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nº do Pedido: ${estadoCompra.pedidoNumero}`, 20, 75);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 85);
    doc.text(`Cliente: ${document.getElementById('nome').value}`, 20, 95);
    doc.text(`CPF: ${document.getElementById('cpf').value}`, 20, 105);
    doc.text(`E-mail: ${document.getElementById('email').value}`, 20, 115);
    
    // Produto
    doc.setFont('helvetica', 'bold');
    doc.text('Produto', 20, 135);
    doc.setFont('helvetica', 'normal');
    doc.text(`${estadoCompra.produto.nome} - Cód: ${estadoCompra.produto.codigo}`, 20, 145);
    doc.text(`Quantidade: ${estadoCompra.quantidade}`, 20, 155);
    
    // Valores
    const subtotal = estadoCompra.produto.preco * estadoCompra.quantidade;
    const total = subtotal + estadoCompra.frete - estadoCompra.desconto;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo de Valores', 20, 175);
    doc.setFont('helvetica', 'normal');
    doc.text(`Subtotal: R$ ${subtotal.toFixed(2)}`, 20, 185);
    doc.text(`Frete: R$ ${estadoCompra.frete.toFixed(2)}`, 20, 195);
    if (estadoCompra.desconto > 0) {
        doc.text(`Desconto: -R$ ${estadoCompra.desconto.toFixed(2)}`, 20, 205);
    }
    
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(59, 130, 246);
    doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 20, 220);
    
    // Rodapé
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(10);
    doc.text('SafeTrack - Tecnologia para segurança familiar', 105, 270, { align: 'center' });
    doc.text('Este é um comprovante de compra válido.', 105, 280, { align: 'center' });
    
    // Salvar PDF
    doc.save(`SafeTrack_${estadoCompra.pedidoNumero}.pdf`);
}

// Função para imprimir recibo
function imprimirRecibo() {
    const reciboWindow = window.open('', '_blank');
    
    reciboWindow.document.write(`
        <html>
        <head>
            <title>SafeTrack - Comprovante de Compra</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 40px; }
                .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; text-align: center; border-radius: 10px; }
                .content { margin: 30px 0; }
                .info { margin: 20px 0; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px; }
                .total { font-size: 24px; color: #3b82f6; font-weight: bold; margin-top: 20px; }
                .footer { text-align: center; color: #64748b; margin-top: 50px; font-size: 12px; }
                table { width: 100%; border-collapse: collapse; }
                td { padding: 10px; border-bottom: 1px solid #e2e8f0; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>SafeTrack</h1>
                <h2>Comprovante de Compra</h2>
            </div>
            
            <div class="content">
                <div class="info">
                    <h3>Dados do Pedido</h3>
                    <p><strong>Nº do Pedido:</strong> ${estadoCompra.pedidoNumero}</p>
                    <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                    <p><strong>Cliente:</strong> ${document.getElementById('nome').value}</p>
                    <p><strong>CPF:</strong> ${document.getElementById('cpf').value}</p>
                    <p><strong>E-mail:</strong> ${document.getElementById('email').value}</p>
                </div>
                
                <div class="info">
                    <h3>Produto</h3>
                    <p><strong>${estadoCompra.produto.nome}</strong> - Cód: ${estadoCompra.produto.codigo}</p>
                    <p>Quantidade: ${estadoCompra.quantidade}</p>
                </div>
                
                <div class="info">
                    <h3>Resumo de Valores</h3>
                    <table>
                        <tr>
                            <td>Subtotal</td>
                            <td><strong>R$ ${(estadoCompra.produto.preco * estadoCompra.quantidade).toFixed(2)}</strong></td>
                        </tr>
                        <tr>
                            <td>Frete</td>
                            <td><strong>R$ ${estadoCompra.frete.toFixed(2)}</strong></td>
                        </tr>
                        ${estadoCompra.desconto > 0 ? `
                        <tr>
                            <td>Desconto</td>
                            <td><strong>-R$ ${estadoCompra.desconto.toFixed(2)}</strong></td>
                        </tr>
                        ` : ''}
                    </table>
                    
                    <div class="total">
                        TOTAL: R$ ${(estadoCompra.produto.preco * estadoCompra.quantidade + estadoCompra.frete - estadoCompra.desconto).toFixed(2)}
                    </div>
                </div>
                
                <div class="info">
                    <h3>Endereço de Entrega</h3>
                    <p>${document.getElementById('endereco').value}, ${document.getElementById('numero').value}</p>
                    ${document.getElementById('complemento').value ? `<p>Complemento: ${document.getElementById('complemento').value}</p>` : ''}
                    <p>${document.getElementById('bairro').value} - ${document.getElementById('cidade').value}/${document.getElementById('estado').value}</p>
                    <p>CEP: ${document.getElementById('cep').value}</p>
                </div>
                
                <div class="info">
                    <h3>Forma de Pagamento</h3>
                    <p>${estadoCompra.metodoPagamento === 'cartao' ? 'Cartão de Crédito' : estadoCompra.metodoPagamento === 'pix' ? 'PIX' : 'Boleto Bancário'}</p>
                </div>
            </div>
            
            <div class="footer">
                <p>SafeTrack - Tecnologia para segurança familiar</p>
                <p>Este comprovante é válido para todos os fins legais.</p>
            </div>
            
            <script>
                window.onload = function() { window.print(); }
            <\/script>
        </body>
        </html>
    `);
    
    reciboWindow.document.close();
}

// Função para enviar e-mail (preparada para EmailJS)
function enviarEmailConfirmacao() {
    // Template para EmailJS - você só precisa configurar suas credenciais
    /*
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: document.getElementById('email').value,
        to_name: document.getElementById('nome').value,
        order_number: estadoCompra.pedidoNumero,
        product_name: estadoCompra.produto.nome,
        product_price: estadoCompra.produto.preco.toFixed(2),
        quantity: estadoCompra.quantidade,
        freight: estadoCompra.frete.toFixed(2),
        discount: estadoCompra.desconto.toFixed(2),
        total: (estadoCompra.produto.preco * estadoCompra.quantidade + estadoCompra.frete - estadoCompra.desconto).toFixed(2),
        address: `${document.getElementById('endereco').value}, ${document.getElementById('numero').value}`,
        neighborhood: document.getElementById('bairro').value,
        city: `${document.getElementById('cidade').value}/${document.getElementById('estado').value}`,
        cep: document.getElementById('cep').value,
        payment_method: estadoCompra.metodoPagamento,
        date: new Date().toLocaleDateString('pt-BR')
    }).then(function(response) {
        console.log('E-mail enviado!', response);
    }, function(error) {
        console.log('Erro ao enviar e-mail:', error);
    });
    */
    
    console.log('📧 E-mail de confirmação seria enviado para:', document.getElementById('email').value);
}

// Finalizar compra
document.getElementById('finalizar-compra')?.addEventListener('click', finalizarCompra);

function finalizarCompra() {
    if (!validarFormulario()) {
        return;
    }
    
    // Mostrar loading
    const btnFinalizar = document.getElementById('finalizar-compra');
    const originalText = btnFinalizar.innerHTML;
    btnFinalizar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
    btnFinalizar.disabled = true;
    
    // Gerar número de pedido
    estadoCompra.pedidoNumero = 'ST' + Date.now().toString().slice(-8);
    const email = document.getElementById('email').value;
    
    // Simular processamento
    setTimeout(() => {
        // Atualizar modal
        document.getElementById('numero-pedido').textContent = `#${estadoCompra.pedidoNumero}`;
        document.getElementById('email-confirmacao').textContent = email;
        
        // Mostrar modal
        const modal = document.getElementById('modal-confirmacao');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Restaurar botão
        btnFinalizar.innerHTML = originalText;
        btnFinalizar.disabled = false;
        
        // Salvar pedido no localStorage
        const pedido = {
            numero: estadoCompra.pedidoNumero,
            data: new Date().toISOString(),
            produto: estadoCompra.produto.nome,
            total: estadoCompra.produto.preco * estadoCompra.quantidade + estadoCompra.frete - estadoCompra.desconto,
            status: 'confirmado',
            cliente: document.getElementById('nome').value,
            email: email
        };
        
        localStorage.setItem('ultimoPedido', JSON.stringify(pedido));
        
        // Limpar carrinho
        localStorage.removeItem('carrinho');
        
        // Atualizar contador do carrinho
        document.querySelector('.carrinho-count').textContent = '0';
        
        // Enviar e-mail de confirmação
        enviarEmailConfirmacao();
        
        console.log('✅ Pedido finalizado com sucesso!', pedido);
    }, 2000);
}

// Continuar para pagamento
document.getElementById('continuar-pagamento')?.addEventListener('click', function() {
    const pagamentoSection = document.getElementById('pagamento');
    
    // Validar dados de entrega
    if (!validarDadosEntrega()) {
        alert('Por favor, preencha todos os dados de entrega antes de continuar.');
        return;
    }
    
    // Scroll para seção de pagamento
    pagamentoSection.scrollIntoView({ behavior: 'smooth' });
    
    // Atualizar progresso
    document.querySelectorAll('.progresso-step')[2].classList.add('active');
});

function validarDadosEntrega() {
    const campos = ['nome', 'email', 'telefone', 'cpf', 'cep', 'endereco', 'numero', 'bairro', 'cidade', 'estado'];
    
    for (const campoId of campos) {
        const campo = document.getElementById(campoId);
        if (!campo || !campo.value.trim()) {
            return false;
        }
    }
    
    return true;
}

// Fechar modal
document.querySelector('.modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Imprimir recibo real
document.getElementById('imprimir-recibo')?.addEventListener('click', function() {
    imprimirRecibo();
});

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    inicializarProduto();
    
    // Adicionar máscara de CPF
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            
            this.value = value;
        });
    }
    
    console.log('🚀 Página de compra carregada com cores vibrantes!');
    
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
        toast.innerHTML = '<i class="fas fa-shield-alt"></i> Compra 100% segura!';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }, 1000);
});

// Adicionar estilo para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);