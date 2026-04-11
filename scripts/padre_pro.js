document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('padre-pro-toggle');
    const closeBtn = document.getElementById('padre-pro-close');
    const chatWindow = document.getElementById('padre-pro-window');
    const sendBtn = document.getElementById('padre-pro-send');
    const textInput = document.getElementById('padre-pro-text');
    const chatBox = document.getElementById('padre-pro-chat');

    // MOCK RESPONSES - Diccionario estático (HASTA CONECTAR CON RAG/OPENAI)
    const mockBrain = {
        "color": "El **color litúrgico** es una disciplina que rige el carácter de la celebración.\n- **Verde:** Tiempo Ordinario.\n- **Blanco/Dorado:** Pascua, Navidad y Solemnidades.\n- **Morado:** Adviento, Cuaresma y Exequias.\n- **Rojo:** Pentecostés y Mártires.",
        "bautismo": "El sacramento del bautismo, cuando se celebra dentro de la misa, obliga a omitir el Rito Penitencial (pues el bautismo en sí mismo quita el pecado). Se recomienda fuertemente el **Rito Consagratorio del Agua** después de la homilía.",
        "rosario": "El Santo Rosario es un sacramental devocional. Aunque es una oración excelente, se desaconseja rezarlo *durante* la Misa Eucarística, para no distraer la atención de la Plegaria Eucarística central.",
        "default": "Aún no me han conectado a la nube central, hijo mío. Cuando el Padre Alan enlace mi conexión a la Base de Datos Magisterial (API), podré consultar todos los tomos del Misal Romano, el CIC y la Biblia para responder con precisión canónica."
    };

    function keywordMatch(text) {
        text = text.toLowerCase();
        if (text.includes("color")) return mockBrain["color"];
        if (text.includes("bautismo")) return mockBrain["bautismo"];
        if (text.includes("rosario")) return mockBrain["rosario"];
        return mockBrain["default"];
    }

    // ABRIR/CERRAR
    toggleBtn.addEventListener('click', () => {
        chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
        if (chatWindow.style.display === 'flex') {
            textInput.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.style.display = 'none';
    });

    // PARSER SENCILLO DE MARKDOWN A HTML PARA CHAT
    function parseChatMarkdown(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n- (.*)/g, '<br>• $1')
            .replace(/\n/g, '<br>');
    }

    // INYECTAR MENSAJES AL DOM
    function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.innerHTML = `<p>${parseChatMarkdown(text)}</p>`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // MOSTRAR INDICADOR "ESCRIBIENDO"
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = `chat-message bot typing-indicator`;
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `<p>El Padre PRO está revisando el Misal...</p>`;
        chatBox.appendChild(typingDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function removeTyping() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) typingDiv.remove();
    }

    // MANEJAR EL ENVÍO DE CONSULTA
    function handleSend() {
        const text = textInput.value.trim();
        if (!text) return;

        // 1. Mostrar texto del usuario
        appendMessage('user', text);
        textInput.value = '';

        // 2. Mostrar "Escribiendo"
        showTyping();

        // 3. Simular delay del backend
        setTimeout(() => {
            removeTyping();
            const response = keywordMatch(text);
            appendMessage('bot', response);
        }, 1500);

        // TODO FUTURE: 
        // fetch('https://tu-api.com/padre_pro', { method: 'POST', body: JSON.stringify({q: text}) }) ...
    }

    sendBtn.addEventListener('click', handleSend);
    textInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    });

});
