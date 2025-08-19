(function() {
    'use strict';

    let configuracao = {};

    // Função que oculta notificações e remove áudio se necessário
    function ocultarNotificacoes() {
        Object.keys(configuracao).forEach(classe => {
            if (configuracao[classe] && classe !== 'notification-sound') {
                document.querySelectorAll(`#ixc_notificacao .${classe}`).forEach(el => {
                    el.style.display = 'none';
                });
            }
        });

        // Bloquear áudio se a opção estiver marcada
        if (configuracao['notification-sound']) {
            document.querySelectorAll('#ixc_notificacao audio').forEach(audio => {
                audio.pause?.();
                audio.removeAttribute('autoplay');
                audio.remove();
            });
        }
    }

    // Observer que monitora alterações no container de notificações
    function iniciarObserverNoContainer(container) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    // Se for um <audio> de notificação, remove imediatamente
                    if (node.tagName === 'AUDIO' && node.id === 'notification-audio') {
                        if (configuracao['notification-sound']) {
                            node.pause?.();
                            node.removeAttribute('autoplay');
                            node.remove();
                        }
                    }
                });
            });
            ocultarNotificacoes();
        });
        observer.observe(container, { childList: true, subtree: true });
    }

    // Observer do body até o container aparecer
    const bodyObserver = new MutationObserver(() => {
        const container = document.getElementById('ixc_notificacao');
        if (container) {
            iniciarObserverNoContainer(container);
            ocultarNotificacoes();
            bodyObserver.disconnect();
        }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // Ler configuração inicial
    chrome.storage.local.get('bloqueioNotificacoesIXC', data => {
        configuracao = data.bloqueioNotificacoesIXC || {};
        ocultarNotificacoes();
    });

    // Atualizar configuração quando houver mudança no storage
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.bloqueioNotificacoesIXC) {
            configuracao = changes.bloqueioNotificacoesIXC.newValue || {};
            ocultarNotificacoes();
        }
    });

    // Proteção extra: interceptar qualquer play() manual
    (function() {
        const originalPlay = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function(...args) {
            if (configuracao['notification-sound'] && this.id === 'notification-audio') {
                this.muted = true;
                this.pause?.();
                return Promise.resolve(); // cancela o play
            }
            return originalPlay.apply(this, args);
        };
    })();

})();
(function() {
    'use strict';

    let configuracao = {};

    // Função que oculta notificações e remove áudio se necessário
    function ocultarNotificacoes() {
        Object.keys(configuracao).forEach(classe => {
            if (configuracao[classe] && classe !== 'notification-sound') {
                document.querySelectorAll(`#ixc_notificacao .${classe}`).forEach(el => {
                    el.style.display = 'none';
                });
            }
        });

        // Bloquear áudio se a opção estiver marcada
        if (configuracao['notification-sound']) {
            document.querySelectorAll('#ixc_notificacao audio').forEach(audio => {
                audio.pause?.();
                audio.removeAttribute('autoplay');
                audio.remove();
            });
        }
    }

    // Observer que monitora alterações no container de notificações
    function iniciarObserverNoContainer(container) {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    // Se for um <audio> de notificação, remove imediatamente
                    if (node.tagName === 'AUDIO' && node.id === 'notification-audio') {
                        if (configuracao['notification-sound']) {
                            node.pause?.();
                            node.removeAttribute('autoplay');
                            node.remove();
                        }
                    }
                });
            });
            ocultarNotificacoes();
        });
        observer.observe(container, { childList: true, subtree: true });
    }

    // Observer do body até o container aparecer
    const bodyObserver = new MutationObserver(() => {
        const container = document.getElementById('ixc_notificacao');
        if (container) {
            iniciarObserverNoContainer(container);
            ocultarNotificacoes();
            bodyObserver.disconnect();
        }
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // Ler configuração inicial
    chrome.storage.local.get('bloqueioNotificacoesIXC', data => {
        configuracao = data.bloqueioNotificacoesIXC || {};
        ocultarNotificacoes();
    });

    // Atualizar configuração quando houver mudança no storage
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.bloqueioNotificacoesIXC) {
            configuracao = changes.bloqueioNotificacoesIXC.newValue || {};
            ocultarNotificacoes();
        }
    });

    // Proteção extra: interceptar qualquer play() manual
    (function() {
        const originalPlay = HTMLMediaElement.prototype.play;
        HTMLMediaElement.prototype.play = function(...args) {
            if (configuracao['notification-sound'] && this.id === 'notification-audio') {
                this.muted = true;
                this.pause?.();
                return Promise.resolve(); // cancela o play
            }
            return originalPlay.apply(this, args);
        };
    })();

})();
