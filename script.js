const Gameboard = (() => {
    const cells = document.querySelectorAll('.cell')
    return {cells}
})()

function CreatePlayer(name) {
    return () => {
        const greeting = `Hi ${name}!`
        return {name, greeting}
    }
}

const GameController = (() => {
    let memory = []
    for (let cell of Gameboard.cells) {
        cell.addEventListener('click', (event) => {
            if (!memory.includes(event.target)) {
                memory.push(event.target)
                if (memory.length % 2 !== 0) {
                    event.target.classList.add('player1')
                    event.target.style.backgroundColor = 'red'
                } else {
                    event.target.classList.add('player2')
                    event.target.style.backgroundColor = 'blue'
                }
            }
        })
    }
})()