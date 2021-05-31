const { pipe, doAsync } = require('./helper')



const initState =
{
    topic: 'userInput',
    data: {
        first: 1,
        second: 2,
    },
    subs: []
}

const plus = (data) => data.first + data.second

const minus = (data) => data.first - data.second

const result = (...fns) =>
{
    console.log(fns)
}

const Store = (initMsg) =>
{
    let initStore = {}

    const updaterData = ({topic,msg}) => {
        Reflect.set(initStore[topic], msg)
        return {topic}
    }

   
}

