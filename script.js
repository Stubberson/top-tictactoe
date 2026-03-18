const Gameboard = (() => {
    let gameboard = []
})()

const GameController = (() => {

})()

function CreatePlayer(name) {
    return () => {
        const greeting = `Hi ${name}!`
        return {name, greeting}
    }
}