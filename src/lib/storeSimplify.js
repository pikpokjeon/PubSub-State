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

    const getData = topic => initStore[topic]

    const registerSub = ({topic,subs}) => 
    { 
        initStore[topic].sub.push(...subs) 
        return {topic}
    }

    const ack = ({topic}) => initStore[topic].sub.forEach( fn => fn(initStore[topic]))

    const setData = (topic,msg) => pipe({topic,msg} , updaterData, ack)

   
  

}

