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
// Minecraft server IP
const serverIP = "mc.herowars.cz";

// Funkce pro aktualizaci stavu hráčů
async function updatePlayerStatus() {
    try {
        // Volání API
        const response = await fetch(`https://api.mcsrvstat.us/2/mc.herowars.cz`);
        const data = await response.json();

        if (data.online && data.players && data.players.list) {
            const onlinePlayers = data.players.list;

            // Procházíme všechny členy admin týmu
            document.querySelectorAll('.team-member').forEach(member => {
                const username = member.getAttribute('data-username');
                const status = member.querySelector('.status');

                // Kontrola, jestli je hráč online
                if (onlinePlayers.includes(username)) {
                    status.classList.remove('offline');
                    status.classList.add('online');
                } else {
                    status.classList.remove('online');
                    status.classList.add('offline');
                }
            });
        } else {
            console.error("Server není online nebo API neposkytuje seznam hráčů.");
        }
    } catch (error) {
        console.error("Chyba při načítání stavu hráčů:", error);
    }
}

// První aktualizace a nastavení intervalu každých 30 sekund
updatePlayerStatus();
setInterval(updatePlayerStatus, 30000);
