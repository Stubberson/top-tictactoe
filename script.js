const gameboard = (() => {
    return document.querySelectorAll('.cell')
})()

function Player(name) {
    this.name = name
    this.moveHistory = []
    this.addMove = move => this.moveHistory.push(move)
    this.getMoves = () => {  // Return a sorted move history for easier win check
          return this.moveHistory.toSorted()
    }
}

const gameController = (() => {
    const gameboardCells = gameboard
    let players = []
    let playerOne = undefined
    let playerTwo = undefined

    // Create players
    const createPlayerButton = document.querySelector('.submit-player')
    createPlayerButton.addEventListener('click', () => {
        let playerLabel = document.querySelector('.player label')
        playerLabel.innerText = playerLabel.innerText.replace('1', '2')
        let nameInput = document.querySelector('input')
        let player = new Player(nameInput.value)
        players.push(player)
        nameInput.value = ''
        
        playerOne = players[0]
        playerTwo = players[1]

        if (players.length === 2) {  // Disable inputs, enable board
            playerLabel.hidden = true
            nameInput.hidden = true
            createPlayerButton.hidden = true
            for (let cell of gameboardCells) {
                cell.style.opacity = 1
            }            
        }
    })

    const result = document.querySelector('.result')
    let gameMemory = []
    let gameOver = false

    const winningLines = [[1,2,3], [4,5,6], [7,8,9],  // Rows
                          [1,4,7], [2,5,8], [3,6,9],  // Cols
                          [1,5,9], [3,5,7]]           // Diag

    // Helper function to check win
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
                        playerOne.addMove(Number.parseInt(event.target.id))
                        event.target.style.backgroundColor = 'red'
                    } else {
                        playerTwo.addMove(Number.parseInt(event.target.id))
                        event.target.style.backgroundColor = 'blue'
                    }
                }

                if (gameMemory.length > 4) {  // One can only win with 3 markers
                    let playerOneMoves = playerOne.getMoves()
                    let playerTwoMoves = playerTwo.getMoves()
                    
                    for (let line of winningLines) {
                        if (winCondition(playerOneMoves, line)) {
                            result.innerText = 'Result: ' + `${playerOne.name} wins!`
                            gameOver = true
                        }
                        if (winCondition(playerTwoMoves, line)) {
                            result.innerText = 'Result: ' + `${playerTwo.name} wins!`
                            gameOver = true
                        }
                    }

                    if (gameMemory.length === 9 && !gameOver) {  // Tie if no winner declared
                        result.innerText = 'Result: ' + 'Tie!'
                        gameOver = true
                    }
                }
            }
        })
    }
})()