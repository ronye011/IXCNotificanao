document.addEventListener('DOMContentLoaded', () => {
    const tipos = [
        'notification-success',
        'notification-error',
        'notification-info',
        'notification-alert',
        'notification-sound' // nova opção
    ];

    // Carregar configuração existente
    chrome.storage.local.get('bloqueioNotificacoesIXC', data => {
        const config = data.bloqueioNotificacoesIXC || {};
        tipos.forEach(classe => {
            document.getElementById(classe).checked = config[classe] || false;
        });
    });

    // Salvar ao clicar no botão
    document.getElementById('save').addEventListener('click', () => {
        const novaConfig = {};
        tipos.forEach(classe => {
            novaConfig[classe] = document.getElementById(classe).checked;
        });

        chrome.storage.local.set({ bloqueioNotificacoesIXC: novaConfig }, () => {
            window.close(); // Fecha o popup
        });
    });
});

