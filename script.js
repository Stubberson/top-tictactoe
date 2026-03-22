const Gameboard = (() => {
    return document.querySelectorAll('.cell')
})()

function Player(name) {
    this.name = name

    this.moveHistory = []
    this.addMove = move => {this.moveHistory.push(move)}
    this.getMoves = () => {  // Return a sorted move history for easier win check
          return this.moveHistory.toSorted()
    }
}

const gameController = (() => {
    const gameboardCells = Gameboard
    let playerOne = new Player('T')
    let playerTwo = new Player('L')
    let gameMemory = []

    function winCondition(playerMoves, winningLine) {
        return winningLine.every(value => playerMoves.includes(value))
    }

    // Add listeners to each cell, indicate a placement, and check for win/tie
    for (let cell of gameboardCells) {
        cell.addEventListener('click', (event) => {
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

                let winningLines = [[1,2,3], [4,5,6], [7,8,9],  // Rows
                                    [1,4,7], [2,5,8], [3,6,9],  // Cols
                                    [1,5,9], [3,5,7]]           // Diag
                
                for (let line of winningLines) {
                    if (winCondition(playerOneMoves, line)) {
                        console.log('Player 1 wins!')
                        return
                    }
                    if (winCondition(playerTwoMoves, line)) {
                        console.log('Player 2 wins!')
                        return
                    }
                }

                if (gameMemory.length === 9) {  // Tie if no winner declared
                    console.log('TIE')
                }
            }
        })
    }
})()