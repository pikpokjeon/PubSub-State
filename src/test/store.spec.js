const {Store} = require('../lib/store')


const predefinedData =
{
    userInputs: {
        // [Symbol.toStringTag] : 'userInputs', This will be set when publishing a topic with msgs
        w: 1500,
        d: [0, 230,],

    },
    chartEvent: {
        // [Symbol.toStringTag] : 'chartEvent',
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


const initStore = Store()

initStore.publish('userInput', predefinedData.userInputs)
initStore.subscribe('userInput', (e) => console.log(e))

initStore.action('userInput', ({w}) => ({w: 1700}))

console.log(initStore.getData('userInput'))

const secondStore = Store(predefinedData)

console.log(secondStore.getData('chartEvent'))

// const mutate = (store, sub, msgs) =>
// {
//     test('Check mutated store data', () =>
//     {
//     })
// }

// describe('Store')


