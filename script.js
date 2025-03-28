'use strict'; // Modo estrito para evitar erros comuns e melhorar a segurança do código

// --- Função para Abrir ou Fechar Elementos ---
const elementToggleFunc = function (elem) { 
    elem.classList.toggle("active");
}

// --- Manipulação da Barra Lateral ---
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function() { 
        elementToggleFunc(sidebar);
    });
}

// --- Ativação do Filtro de Seleção (Portfolio) ---
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
    select.addEventListener('click', function () { 
        elementToggleFunc(this);
    });
}

if (selectItems && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
        selectItems[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            filterFunc(selectedValue);
        });
    }
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterMap = {
    "desenvolvimento web": "web development"
};

const filterFunc = function (selectedValue) {
    const mappedValue = filterMap[selectedValue] || selectedValue;
    if (filterItems) {
        for (let i = 0; i < filterItems.length; i++) {
            if (mappedValue === "todos" || mappedValue === "all") {
                filterItems[i].classList.add('active');
            } else if (mappedValue === filterItems[i].dataset.category) {
                filterItems[i].classList.add('active');
            } else {
                filterItems[i].classList.remove('active');
            }
        }
    }
};

let lastClickedBtn = filterBtn[0];

if (filterBtn) {
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            filterFunc(selectedValue);
            lastClickedBtn.classList.remove('active');
            this.classList.add('active');
            lastClickedBtn = this;
        });
    }
}

// --- Ativação do Formulário de Contato ---

// --- Ativação da Navegação entre Páginas ---
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

const pageMap = {
    "sobre": "about",
    "resumo": "resume",
    "portfolio": "portfolio",
    "blog": "blog",
    "contato": "contact"
};

if (navigationLinks && pages) {
    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener('click', function() {
            const pageKey = this.innerHTML.toLowerCase().trim();
            const targetPage = pageMap[pageKey];

            // Remove 'active' de todas as páginas e links
            pages.forEach(page => page.classList.remove('active'));
            navigationLinks.forEach(link => link.classList.remove('active'));

            // Encontra a página correspondente
            const targetPageElement = Array.from(pages).find(page => page.dataset.page === targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                this.classList.add('active');
                window.scrollTo(0, 0);
                console.log("Página ativada:", targetPageElement.className);
            } else {
                console.error("Página não encontrada para:", targetPage);
            }
        });
    }
}


'use strict'; // Modo estrito para evitar erros comuns e melhorar a segurança do código

// --- Dados dos Depoimentos ---
const testimonialsData = [
    {
        avatarSrc: "https://i.postimg.cc/DwY0yHtx/avatar-2.png",
        avatarAlt: "avatar",
        name: "Jucelia Martins",
        text: "Richard was hired to create a corporate identity. It's modern, clean and with a beautiful design that got a lot of praises from colleagues and visitors. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client."
    },
    {
        avatarSrc: "https://i.postimg.cc/zGDHfn3G/avatar-1.png",
        avatarAlt: "avatar",
        name: "Bruco Cesar",
        text: "Working with Richard has been an absolute pleasure. I was impressed with his attention to detail, his web design skills and his professional approach to our timelines and processes."
    },
    {
        avatarSrc: "https://i.postimg.cc/fRFWhX9F/avatar-3.png",
        avatarAlt: "avatar",
        name: "Nicoly Siqueira",
        text: "I couldn't be happier with the website that Richard created for us. His attention to detail and creativity is unmatched. Our clients frequently compliment the design, and it has significantly improved our brand image."
    },
];

// --- Função para Gerar os Depoimentos Dinamicamente ---
function renderTestimonials() {
    const testimonialsList = document.getElementById('testimonials-list');
    if (!testimonialsList) {
        console.error("Elemento com ID 'testimonials-list' não encontrado!");
        return;
    }

    testimonialsData.forEach(testimonial => {
        const li = document.createElement('li');
        li.classList.add('testimonials-item');
        li.innerHTML = `
            <div class="content-card" data-testimonials-item>
                <figure class="testimonials-avatar-box">
                    <img src="${testimonial.avatarSrc}" alt="${testimonial.avatarAlt}" data-testimonials-avatar width="60">
                </figure>
                <h4 class="h4 testimonials-item-title" data-testimonials-title>${testimonial.name}</h4>
                <div class="testimonials-text" data-testimonials-text>
                    <p>${testimonial.text}</p>
                </div>
            </div>
        `;
        testimonialsList.appendChild(li);
    });
}

// --- Função para Configurar os Eventos do Modal ---
function setupTestimonialEvents() {
    const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
    const modalContainer = document.querySelector('[data-modal-container]');
    const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
    const overlay = document.querySelector('[data-overlay]');
    const modalImg = document.querySelector('[data-modal-img]');
    const modalTitle = document.querySelector('[data-modal-title]');
    const modalText = document.querySelector('[data-modal-text]');

    const testimonialsModalFunc = function () {
        if (modalContainer && overlay) {
            modalContainer.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    };

    if (testimonialsItem && modalImg && modalTitle && modalText) {
        testimonialsItem.forEach(item => {
            item.addEventListener('click', function () {
                modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
                modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
                modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
                modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;
                testimonialsModalFunc();
            });
        });
    } else {
        console.error("Elementos necessários para o modal não encontrados!");
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    }

    if (overlay) {
        overlay.addEventListener('click', testimonialsModalFunc);
    }
}

// --- Inicialização ---
renderTestimonials();
setupTestimonialEvents();

// Inicializar o EmailJS com a Public Key
emailjs.init("nnrgOPo7snoJUZ4"); // Sua Public Key

// Manipulação do formulário para habilitar o botão
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (formInputs && formBtn) {
    console.log("Formulário e botão encontrados!");
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            console.log("Campo alterado. Formulário válido?", form.checkValidity());
            if (form.checkValidity()) {
                console.log("Formulário válido! Habilitando botão...");
                formBtn.removeAttribute('disabled');
            } else { 
                console.log("Formulário inválido! Desabilitando botão...");
                formBtn.setAttribute('disabled', '');
            }
        });
    }
} else {
    console.error("Formulário ou botão não encontrados!");
}

// Manipulação do envio do formulário
if (form && formBtn) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Coletar os dados do formulário
        const formData = new FormData(form);
        const data = {
            fullname: formData.get('fullname'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Enviar os dados via EmailJS
        emailjs.send('service_92v412u', 'SUA_TEMPLATE_ID_AQUI', data) // Substitua pelo Template ID
            .then((response) => {
                console.log('Email enviado com sucesso!', response.status, response.text);
                alert('Mensagem enviada com sucesso!');
                form.reset(); // Limpa o formulário
                formBtn.setAttribute('disabled', ''); // Desativa o botão novamente
            }, (error) => {
                console.error('Erro ao enviar email:', error);
                alert('Erro ao enviar mensagem. Tente novamente.');
            });
    });
}