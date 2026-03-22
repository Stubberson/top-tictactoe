const Gameboard = (() => {
    return document.querySelectorAll('.cell')
})()

function Player() {
    this.name = document.querySelector('input').value

    this.moveHistory = []
    this.addMove = move => this.moveHistory.push(move)
    this.getMoves = () => {  // Return a sorted move history for easier win check
          return this.moveHistory.toSorted()
    }
}

const gameController = (() => {
    const gameboardCells = Gameboard
    const result = document.querySelector('.result')
    const playerOne = new Player()
    const playerTwo = new Player()
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
            if (!gameOver) {  // Stop listening after game is over
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
                            result.innerText += ' ' + `${playerOne.name} wins!`
                            gameOver = true
                        }
                        if (winCondition(playerTwoMoves, line)) {
                            result.innerText += ' ' + `${playerTwo.name} wins!`
                            gameOver = true
                        }
                    }

                    if (gameMemory.length === 9) {  // Tie if no winner declared
                        result.innerText += ' ' + 'Tie!'
                        gameOver = true
                    }
                }
            }
        })
    }
})()