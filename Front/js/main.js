document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('input')
    const translateButton = document.getElementById('Translate-Button')
    const output = document.getElementById('output')
    
    translateButton.addEventListener('click', async () => {
        const text = input.value
        output.innerHTML = 'Loading...'
        if (text === '') return
        
        const response = await fetch('https://displeasureably-unbequeathable-erika.ngrok-free.dev/translate', {
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
})