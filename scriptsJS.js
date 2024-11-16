function copyIP(str) {
    const box = document.createElement('textarea');
    box.value = str;
    box.style = { position: 'fixed', left: '0', top: '0', opacity: '0' };
    document.body.appendChild(box);
    box.focus();
    box.select();
    document.execCommand('copy');
    document.body.removeChild(box);

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        }
    });

    Toast.fire({
        icon: 'success',
        title: 'IP adresa zkopírována!'
    });
}

function navbar() {
    document.getElementById("sidebar").classList.toggle("view")
}

var loader = document.getElementById("loader");

window.addEventListener("load", function () {
    loader.style.display = "none";
})

const body = document.getElementById('body');
const modeBtn = document.querySelector('.modeBtn');

modeBtn.addEventListener('click', function () {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
});

const mode = localStorage.getItem('mode');
if (mode === 'dark') {
    body.classList.add('dark');
} else {
    body.classList.remove('dark');
}