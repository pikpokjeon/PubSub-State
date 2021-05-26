const { store } = require('../lib/store')

const predefinedData =
[
    {
        topic: 'userInputs',
        data: {
            // [Symbol.toStringTag] : 'userInputs', This will be set when publishing a topic with msgs
            w: 1500,
            d: [0, 230, ],
          
        },
        
        subs: []
    },
    {
        topic: 'chartEvent',
        data: {
            // [Symbol.toStringTag] : 'chartEvent',
            lastIdx: -1,
            selectedIdx: { start: -1, end: -1 }

        },
        subs: []

    }


]





const expectation =
[
    {
        topic: 'userInputs',
        data: {
            [Symbol.toStringTag]: "userInputs",
            w: 1500,
            d: [0, 230, ],
        },
        
        subs: []
    },
    {
        topic: 'chartEvent',
        data: {
            [Symbol.toStringTag] : 'chartEvent',
            lastIdx: -1,
            selectedIdx: { start: -1, end: -1 }

        },
        subs: []

    }


]

const mutate = (store, sub,msgs) =>
{
    test('Check mutated store data', () =>
    {
        store.pubSubPipe(
            [...msgs],[sub]
        )
        const expectation = Object.assign(store.getData('userInputs'), ...msgs)
        expect(store.getData('userInputs')).toEqual(expectation)
                
    })
}


describe('Initialize store', () =>
{
    const initStore = store(predefinedData,[(p) => ({...p}), (p) => p.topic])
    const initData = initStore.getData('userInputs')


    test('Check initialized store data', () =>
        expect(initData).toEqual(expectation[0].data)
    )

   mutate(initStore,
    (p) => ({...p}),
    [
        {
            topic: 'userInputs',
            data: {
                w: 1700,
                lineType: 'curve'
            },
        }
    ],
    )

})
