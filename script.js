const gameboard = (() => {
    return document.querySelectorAll('.cell')
})()

function createPlayer(name) {
    const playerName = name
    let moveHistory = []
    const addMove = move => moveHistory.push(move)
    const getMoves = () => moveHistory.toSorted()  // Sorted for easier win check
    
    return {playerName, addMove, getMoves}
}

const gameController = (() => {
    const gameboardCells = gameboard
    let players = []

    // Create players
    const playerLabel = document.querySelector('.player-input label')
    const nameInput = document.querySelector('input')
    const createPlayerButton = document.querySelector('.submit-player')
    const playerOneInfo = document.querySelector('.player-one')
    const playerTwoInfo = document.querySelector('.player-two')
    createPlayerButton.addEventListener('click', () => {
        playerLabel.innerText = playerLabel.innerText.replace('1', '2')
        let player = createPlayer(nameInput.value)
        players.push(player)
        nameInput.value = ''
        nameInput.focus()
        playerOneInfo.innerText = `P1: ${players[0].playerName}`

        if (players.length === 2) {  // Update playeres onto screen, disable inputs, enable board
            playerTwoInfo.innerText = `P2: ${players[1].playerName}`
            nameInput.disabled = true
            createPlayerButton.disabled = true
            for (let cell of gameboardCells) {
                cell.style.opacity = 1
                cell.style.cursor = 'pointer'
            }            
        }
    })

    const result = document.querySelector('.result')
    let gameMemory = []
    let gameOver = false

    // To check win
    const winningLines = [[1,2,3], [4,5,6], [7,8,9],  // Rows
                          [1,4,7], [2,5,8], [3,6,9],  // Cols
                          [1,5,9], [3,5,7]]           // Diag
    function winCondition(playerMoves, winningLine) {
        return winningLine.every(value => playerMoves.includes(value))
    }

    // Add listeners to each cell, indicate a placement, and check for win/tie
    for (let cell of gameboardCells) {
        cell.addEventListener('click', (event) => {
            if (!gameOver && players.length === 2) {  // Don't listen if both players not given or game over
                if (!gameMemory.includes(event.target)) {
                    gameMemory.push(event.target)
                    if (gameMemory.length % 2 !== 0) {
                        players[0].addMove(Number.parseInt(event.target.id))
                        event.target.style.backgroundColor = 'red'
                    } else {
                        players[1].addMove(Number.parseInt(event.target.id))
                        event.target.style.backgroundColor = 'blue'
                    }
                }

                if (gameMemory.length > 4) {  // One can only win with 3 markers
                    let playerOneMoves = players[0].getMoves()
                    let playerTwoMoves = players[1].getMoves()
                    
                    for (let line of winningLines) {
                        if (winCondition(playerOneMoves, line)) {
                            result.innerText = 'Result: ' + `${players[0].playerName} wins!`
                            gameOver = true
                            resetGame()
                        }
                        if (winCondition(playerTwoMoves, line)) {
                            result.innerText = 'Result: ' + `${players[1].playerName} wins!`
                            gameOver = true
                            resetGame()
                        }
                    }

                    if (gameMemory.length === 9 && !gameOver) {  // Tie if no winner declared
                        result.innerText = 'Result: ' + 'Tie!'
                        gameOver = true
                        resetGame()
                    }
                }
            }
        })
    }
    
    const resetButton = document.querySelector('#reset')
    function resetGame() {
        resetButton.hidden = false
        resetButton.addEventListener('click', () => {
            players = []
            gameMemory = []
            gameOver = false
            playerLabel.innerText = playerLabel.innerText.replace('2', '1')
            nameInput.disabled = false
            createPlayerButton.disabled = false
            playerOneInfo.innerText = ''
            playerTwoInfo.innerText = ''
            result.innerText = ''

            for (let cell of gameboardCells) {
                cell.style.backgroundColor = ''
                cell.style.opacity = 0.3
                cell.style.cursor = 'default'
            }
            resetButton.hidden = true
        })
    }
})()