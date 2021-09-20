const {Pubsub} = require('../lib/pubsub')


const predefinedData =
{
    userInputs: {
        w: 1500,
        d: [0, 230,],

    },
    chartEvent: {
        lastIdx: -1,
        selectedIdx: {start: -1, end: -1}

    }
}

const expectation =
{
    userInputs: {
        data: {
            [Symbol.toStringTag]: "userInputs",
            w: 1700,
            d: [0, 230,],

        },
        subs: [(e) => console.log(e)]
    },
    chartEvent: {
        data: {
            [Symbol.toStringTag]: 'chartEvent',
            lastIdx: 4,
            selectedIdx: {start: -1, end: -1}

        },
        subs: []

    }
}


const initPubsub = Pubsub()

initPubsub.publish('userInput', predefinedData.userInputs)
initPubsub.subscribe('userInput', (e) => console.log(e))

initPubsub.action('userInput', ({w}) => console.log(w))

console.log(initPubsub.getData('userInput'))

const secondPubsub = Pubsub(predefinedData)

console.log(secondPubsub.getData('chartEvent'))

// const mutate = (Pubsub, sub, msgs) =>
// {
//     test('Check mutated Pubsub data', () =>
//     {
//     })
// }

// describe('Pubsub')


