const SERVER = 'https://displeasureably-unbequeathable-erika.ngrok-free.dev'

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('input')
    const translateButton = document.getElementById('Translate-Button')
    const output = document.getElementById('output')

    // Функция измерения пинга
    async function measurePing() {
    const pingUI = document.getElementById('ping')
    const startTime = performance.now()
    
    try {
        const response = await fetch(SERVER + '/ping', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        })
        
        const endTime = performance.now()
        const totalPing = endTime - startTime
        
        pingUI.textContent = `${totalPing.toFixed(2)}ms`
    } catch (error) {
        pingUI.textContent = 'Ошибка соединения'
    }}
    
    translateButton.addEventListener('click', async () => {
        const text = input.value
        output.innerHTML = 'Loading...'
        if (text === '') return
        
        const response = await fetch(SERVER + '/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: text})
        })
        if (!response.ok) {
            output.innerHTML = 'error... :('
            return
        }
        const data = await response.json()
        output.innerHTML = `
                <div><strong>Google:</strong> ${data.google || 'нет перевода'}</div>
                <div><strong>Wooordhunt:</strong> ${data.wooordhunt || 'нет перевода'}</div>
            `
    })

    measurePing()
})