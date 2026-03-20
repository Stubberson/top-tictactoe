const Gameboard = (() => {
    return document.querySelectorAll('.cell')
})()

function Player(name) {
    this.name = name

    this.moveHistory = []
    this.addMove = move => {this.moveHistory.push(move)}  // Add move to history
    this.getMoves = () => {  // Get all 3-long variations of the moves to check win
        if (this.moveHistory.length === 3) {
            return this.moveHistory.toSorted().join()
        }

        if (this.moveHistory.length === 4) {
            let variations = []
            for (let i = 1; i < 3; i++) {
                let variation = this.moveHistory.toSorted()
                variations.push(variation.toSpliced(i, 1).join())
            }
            return variations
        }
        // if (variations.length === 5) {
        //     for (let index = 0; index < variations.length; index++) {
        //         let variation = variations.toSpliced(1, 2)
        //     }         
        // }        
    }
}
// 1, 2, 3, 4, 5

// 1, 2, 5
// 1, 3, 5
// 1, 4, 5

// 2, 3, 5
// 2, 4, 5


const gameController = (() => {
    const gameboardCells = Gameboard
    let playerOne = new Player('T')
    let playerTwo = new Player('L')
    let gameMemory = []

    // Add listeners to each cell, indicate a placement, and check for win
    for (let cell of gameboardCells) {
        cell.addEventListener('click', (event) => {
            if (!gameMemory.includes(event.target)) {
                gameMemory.push(event.target)
                if (gameMemory.length % 2 !== 0) {
                    playerOne.addMove(event.target.id)
                    event.target.style.backgroundColor = 'red'
                } else {
                    playerTwo.addMove(event.target.id)
                    event.target.style.backgroundColor = 'blue'
                }
            }

            // Winning condition
            if (gameMemory.length > 4) {
                let playerOneMoves = playerOne.getMoves()
                let playerTwoMoves = playerTwo.getMoves()

                console.log(`P1: ${playerOneMoves}, P2: ${playerTwoMoves}`)

                let winningLines = ['1,2,3', '4,5,6', '7,8,9',  // Rows
                                    '1,4,7', '2,5,8', '3,6,9',  // Cols
                                    '1,5,9', '3,5,7']           // Diag
                
                for (let line of winningLines) {
                    if (playerOneMoves.includes(line)) {
                        console.log(`Player ${playerOne.name} wins!`)
                        return
                    }
                    
                    if (playerTwoMoves.includes(line)) {
                        console.log(`Player ${playerTwo.name} wins!`)
                        return
                    }
                }
            }
        })
    }
})()