const {pipe} = require('./helper')

// import { Store, predefinedData } from './store'

/**
 * 
 * @param {*} msg data
 * @param {*} sub subscriber that subscribe the data
 */
const Store = (msgs, sub) =>
{

    let _store = {}

    const ack = ({topic}) => _store[topic].subs.forEach(sub => sub(_store[topic].data))

    const subscribe = ({topic, sub}) => 
    {
        if (!_store[topic]) Object.assign(_store, {[topic]: {subs: []}})
        else
        {
            _store[topic].subs.push(sub)
        }
        return {topic}
    }

    const getData = (_store) => (topic) => _store[topic].data

    const setData = (topic, msgs) =>
    {
        const prevStore = _store[topic]
        const temp = {
            [topic]: {
                data: prevStore ? {...prevStore['data'], ...msgs} : {[Symbol.toStringTag]: topic, ...msgs},
                subs: prevStore ? [...prevStore['subs']] : []
            }
        }

        Object.assign(_store, temp)
        return {topic}
    }

    const publish = (topic, msgs) => [pipe(setData(topic, msgs), ack)]

    const action = (topic, fn) => [pipe(setData(topic, fn(getData(_store)(topic)) ?? {}), ack)]

    if (msgs && sub) publish(msgs, sub)

    return {setData, publish, subscribe: (topic, sub) => subscribe({topic, sub}), getData: getData(_store), action}

}

module.exports = {Store}
