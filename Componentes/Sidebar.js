/**
 * Sidebar Padronizada - PetShop Pro
 * Este arquivo centraliza a navegação para facilitar a manutenção.
 */

const sidebarContent = `
    <div class="logo-container">
        <i data-lucide="dog" style="width: 32px; height: 32px;"></i>
        <span>PetShop Pro</span>
    </div>
    
    <p class="menu-label">Painel</p>
    <nav>
        <a href="../TelaInicial/TelaInicia.html" class="nav-item" data-page="dashboard">
            <i data-lucide="layout-dashboard"></i> Dashboard
        </a>
        <a href="Agenda.html  " class="nav-item" data-page="agenda">
            <i data-lucide="calendar"></i> Agenda Teams
        </a>
        
        <p class="menu-label" style="margin-top: 24px;">Vendas e Serviços</p>
        <a href="#" class="nav-item" data-page="pdv"><i data-lucide="shopping-cart"></i> Carrinho / PDV</a>
        <a href="#" class="nav-item" data-page="servicos"><i data-lucide="scissors"></i> Catálogo de Serviços</a>
        
        <p class="menu-label" style="margin-top: 24px;">Cadastros</p>
        <a href="#" class="nav-item" data-page="clientes"><i data-lucide="users"></i> Clientes</a>
        <a href="#" class="nav-item" data-page="animais"><i data-lucide="paw-print"></i> Animais</a>
        <a href="#" class="nav-item" data-page="produtos"><i data-lucide="package"></i> Itens / Produtos</a>
        
        <p class="menu-label" style="margin-top: 24px;">Gestão</p>
        <a href="#" class="nav-item" data-page="estoque"><i data-lucide="boxes"></i> Controle de Estoque</a>
        <a href="#" class="nav-item" data-page="gastos"><i data-lucide="trending-down"></i> Gastos Previstos</a>
    </nav>
`;

function initSidebar() {
    const sidebarElement = document.getElementById('sidebar-target');
    if (!sidebarElement) return;

    // Insere o conteúdo
    sidebarElement.innerHTML = sidebarContent;

    // Identifica a página atual pela URL para marcar como 'active'
    const currentPage = window.location.pathname;
    const navItems = sidebarElement.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPage.includes(href) && href !== '#') {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Inicializa os ícones do Lucide após a inserção do HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Executa ao carregar o DOM
document.addEventListener('DOMContentLoaded', initSidebar);