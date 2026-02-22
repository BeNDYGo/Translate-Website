document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('input')
    const translateButton = document.getElementById('Translate-Button')
    const output = document.getElementById('output')
    
    translateButton.addEventListener('click', async () => {
        const text = input.value
        if (text === '') return
        
        const response = await fetch('http://localhost:6767/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: text})
        })
        const data = await response.json()
        output.innerHTML = `
                <div><strong>Google:</strong> ${data.google || 'нет перевода'}</div>
                <div><strong>Wooordhunt:</strong> ${data.wooordhunt || 'нет перевода'}</div>
            `
    })
})