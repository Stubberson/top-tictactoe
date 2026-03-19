const Gameboard = (() => {
    const cells = document.querySelectorAll('.cell')
    return {cells}
})()

function Player(name) {
    this.name = name
    this.moves = []
}

const gameController = (() => {
    let playerOne = new Player('T')
    let playerTwo = new Player('L')

    let gameMemory = []
    for (let cell of Gameboard.cells) {
        cell.addEventListener('click', (event) => {
            if (!gameMemory.includes(event.target)) {
                gameMemory.push(event.target)
                if (gameMemory.length % 2 !== 0) {
                    playerOne.moves.push(Number.parseInt(event.target.id))
                    event.target.style.backgroundColor = 'red'
                } else {
                    playerTwo.moves.push(Number.parseInt(event.target.id))
                    event.target.style.backgroundColor = 'blue'
                }
            }
            let oneSorted = playerOne.moves.toSorted()
            let twoSorted = playerTwo.moves.toSorted()
        })
    }
})()