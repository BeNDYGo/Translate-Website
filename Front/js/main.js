const SERVER = 'https://813e-159-255-33-104.ngrok-free.app'

document.addEventListener('DOMContentLoaded', async () => {
    const input = document.getElementById('input')
    const translateButton = document.getElementById('Translate-Button')
    const output = document.getElementById('output')
    const addButton = document.getElementById('Add-Button')
    const wordsLearning = document.querySelector('.words-learning')

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
        const buttonContainer = document.querySelector('.button-container')
        addButton.style.display = 'none'
        buttonContainer.classList.remove('has-add')
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
        addButton.style.display = 'block'
        buttonContainer.classList.add('has-add')
    })

    function addWordToContainer(word) {
        const newWord = document.createElement('li')
        newWord.textContent = word
        newWord.addEventListener('dblclick', function() {
            this.remove()
            let words = JSON.parse(localStorage.getItem('learningWords')) || []
            words = words.filter(w => w !== word)
            localStorage.setItem('learningWords', JSON.stringify(words))
        })
        wordsLearning.querySelector('.words-container').prepend(newWord)
    }

    addButton.addEventListener('click', () => {
        wordsLearning.style.display = 'block'
        addWordToContainer(input.value)
        
        const currentWords = JSON.parse(localStorage.getItem('learningWords')) || []
        currentWords.push(input.value)
        localStorage.setItem('learningWords', JSON.stringify(currentWords))
    })

    // Загрузка сохраненных слов
    const words = JSON.parse(localStorage.getItem('learningWords')) || []
    const wordsContainer = wordsLearning.querySelector('.words-container')
    wordsContainer.innerHTML = ''
    words.forEach(word => {
        addWordToContainer(word)
    })

    measurePing()
})
