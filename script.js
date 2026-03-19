const Gameboard = (() => {
    const grid = document.querySelector('#board')
    return {grid}
})()

const GameController = (() => {
    let memory = []
    Gameboard.grid.addEventListener('click', (event) => {
        memory.push(event.target.id)
        event.target.innerText = 'clicked'
    })
})()

function CreatePlayer(name) {
    return () => {
        const greeting = `Hi ${name}!`
        return {name, greeting}
    }
}