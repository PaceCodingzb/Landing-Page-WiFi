'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar variables
 */

const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navToggleBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
  });

}

/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

let lastScrollPosition = 0;

window.addEventListener("scroll", function () {

  let scrollPosition = window.pageYOffset;

  if (scrollPosition > lastScrollPosition) {
    header.classList.remove("active");
  } else {
    header.classList.add("active");
  }

  lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;

});


// State Variables
let isLoggedIn = false;
let timerInterval = null;
let speedInterval = null;
let remainingSeconds = 86385; // ~23 hours 59 min
let dataUsedMB = 142.5;

// Switch Tab Function
function switchTab(tab) {
    const loginBtn = document.getElementById('tab-login-btn');
    const statusBtn = document.getElementById('tab-status-btn');
    const loginContent = document.getElementById('tab-login-content');
    const statusContent = document.getElementById('tab-status-content');

    if (tab === 'login') {
        loginBtn.classList.add('tab-btn-active');
        loginBtn.classList.remove('tab-btn-inactive');
        statusBtn.classList.add('tab-btn-inactive');
        statusBtn.classList.remove('tab-btn-active');

        loginContent.classList.remove('hidden');
        statusContent.classList.add('hidden');
    } else {
        statusBtn.classList.add('tab-btn-active');
        statusBtn.classList.remove('tab-btn-inactive');
        loginBtn.classList.add('tab-btn-inactive');
        loginBtn.classList.remove('tab-btn-active');

        statusContent.classList.remove('hidden');
        loginContent.classList.add('hidden');
    }
}

// Toggle Password Visibility
function togglePasswordVisibility() {
    const passInput = document.getElementById('password');
    const passIcon = document.getElementById('pass-icon');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        passIcon.classList.remove('fa-eye');
        passIcon.classList.add('fa-eye-slash');
    } else {
        passInput.type = 'password';
        passIcon.classList.remove('fa-eye-slash');
        passIcon.classList.add('fa-eye');
    }
}

// Handle Login Simulation
function handleLogin(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('username').value.trim();
    const loginBtn = document.getElementById('btn-login');

    if (!usernameInput) return;

    // Loading state
    loginBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> <span>Menghubungkan...</span>`;
    loginBtn.disabled = true;

    setTimeout(() => {
        isLoggedIn = true;

        // Update User Display
        document.getElementById('active-user-display').innerText = usernameInput.toUpperCase();
        document.getElementById('status-dot').classList.remove('hidden');

        // Reset button text
        loginBtn.innerHTML = `<span>Hubungkan Sekarang</span> <i class="fa-solid fa-arrow-right"></i>`;
        loginBtn.disabled = false;

        // Start Live Stats
        startSessionTimers();

        // Switch to status tab
        switchTab('status');
    }, 1200);
}

// Handle Logout Simulation
function handleLogout() {
    isLoggedIn = false;
    clearInterval(timerInterval);
    clearInterval(speedInterval);
    document.getElementById('status-dot').classList.add('hidden');
    switchTab('login');
}

// Timer & Speed Simulation
function startSessionTimers() {
    clearInterval(timerInterval);
    clearInterval(speedInterval);

    // Timer Counter
    timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            const hours = Math.floor(remainingSeconds / 3600);
            const minutes = Math.floor((remainingSeconds % 3600) / 60);
            const seconds = remainingSeconds % 60;

            document.getElementById('timer-display').innerText =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }, 1000);

    // Speed Meter & Data Usage Simulation
    speedInterval = setInterval(() => {
        const randomDl = (Math.random() * (25 - 8) + 8).toFixed(1);
        const randomUl = (Math.random() * (8 - 2) + 2).toFixed(1);

        document.getElementById('speed-dl').innerText = `${randomDl} Mbps`;
        document.getElementById('speed-ul').innerText = `${randomUl} Mbps`;

        dataUsedMB += parseFloat((Math.random() * 0.4).toFixed(2));
        document.getElementById('data-used-display').innerText = `${dataUsedMB.toFixed(1)} MB`;
    }, 2500);
}

// Modal Controls
function openCSModal(context = 'Bantuan CS') {
    const modal = document.getElementById('csModal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const waBtn = document.getElementById('wa-link-btn');

    title.innerText = context;
    desc.innerText = `Layanan bantuan cepat Kas'Kado Wi-Fi. Klik tombol di bawah untuk langsung terhubung ke CS via WhatsApp.`;

    const encodedMsg = encodeURIComponent(`Halo Admin Kas'Kado, saya butuh informasi/bantuan terkait: ${context}`);
    waBtn.href = `https://wa.me/6281234567890?text=${encodedMsg}`;

    modal.classList.remove('hidden');
}

function orderVoucher(paketName) {
    const modal = document.getElementById('csModal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const waBtn = document.getElementById('wa-link-btn');

    title.innerText = `Pemesanan Voucher`;
    desc.innerText = `Anda memilih: ${paketName}. Lanjutkan ke WhatsApp untuk mendapatkan kode voucher secara instan.`;

    const encodedMsg = encodeURIComponent(`Halo Admin Kas'Kado, saya ingin membeli kode voucher: ${paketName}`);
    waBtn.href = `https://wa.me/6281234567890?text=${encodedMsg}`;

    modal.classList.remove('hidden');
}

function closeCSModal() {
    document.getElementById('csModal').classList.add('hidden');
}

function scrollToPaket() {
    document.getElementById('paket').scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}