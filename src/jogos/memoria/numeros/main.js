document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const numberDisplay = document.getElementById('number-display');
    const inputContainer = document.getElementById('input-container');
    const userInput = document.getElementById('user-input');
    const submitButton = document.getElementById('submit-button');
    const progressDiv = document.getElementById('progress');
    const resultDiv = document.getElementById('result');
    const responseTimeSelect = document.getElementById('response-time');
    const sequenceLengthInput = document.getElementById('sequence-length');
    const parametersContainer = document.getElementById('parameters-container');

    let sequenceIndex = 0;
    let startTime;
    const sequences = [];
    const totalSequences = 10;
    let digitLength;
    let displayTimeout;
    let tempoCorrendo;
    let responseTime;

    function startGame() {
        startButton.style.display = 'none';
        parametersContainer.style.display = 'none';
        startTime = new Date();
        progressDiv.textContent = '';
        sequenceIndex = 0;
        responseTime = parseFloat(responseTimeSelect.value);
        digitLength = parseInt(sequenceLengthInput.value, 10);
        sequences.length = 0;
        nextSequence();
    }

    function endGame() {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        resultDiv.textContent = `Parabéns! Você completou o jogo em ${timeTaken} segundos.`;
        startButton.style.display = 'block';
        parametersContainer.style.display = 'flex';
        inputContainer.style.display = 'none';
    }

    function generateSequence() {
        const max = Math.pow(10, digitLength) - 1;
        const min = Math.pow(10, digitLength - 1);
        return Math.floor(min + Math.random() * (max - min)).toString();
    }

    function showSequence(sequence) {
        progressDiv.innerHTML = `Total ${sequenceIndex + 1} de ${totalSequences} <br>`;
        numberDisplay.textContent = sequence;
        tempoCorrendo = true;

        displayTimeout = setTimeout(() => {
            numberDisplay.textContent = '';
            inputContainer.style.display = 'flex';
            userInput.focus();
            tempoCorrendo = false;
        }, (digitLength * 1000) / responseTime);
    }

    function nextSequence() {
        if (sequenceIndex >= totalSequences) {
            endGame();
            return;
        }
        inputContainer.style.display = 'none';
        userInput.value = '';
        userInput.disabled = false;
        const sequence = generateSequence();
        sequences.push(sequence);
        showSequence(sequence);
    }

    function checkInput() {
        const userValue = userInput.value;
        if (userValue === sequences[sequenceIndex]) {
            sequenceIndex++;
            nextSequence();
        } else {
            userInput.value = '';
            userInput.disabled = true;
            inputContainer.style.display = 'none';
            setTimeout(() => {
                userInput.disabled = false;
                showSequence(sequences[sequenceIndex]);
            }, 1000 / responseTime);
        }
    }

    startButton.addEventListener('click', startGame);
    submitButton.addEventListener('click', checkInput);
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            checkInput();
        }
    });

    /*document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && numberDisplay.textContent !== '' && tempoCorrendo) {
            tempoCorrendo = false;
            clearTimeout(displayTimeout);            
            numberDisplay.textContent = '';
            inputContainer.style.display = 'flex';
            userInput.focus();
        }
    });*/
});
