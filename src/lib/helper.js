
const pipe = (initVal, ...fns) => fns.reduce((returned, fn) => fn(returned), initVal)


const ack = ({ _store, topics }) => topics.reduce((updated,topic) => 
{
    const [data, subs] = [ _store[topic].data, _store[topic].subs ]
    pipe(data, ...subs), Object.assign(updated.data, Object.assign({},{...data} ))
}, { data:{}} )



const subscribe = ({ _store, topics, sub }) =>
{

}
 {
    for (const topic of topics) {
        _store[topic].subs.push(...sub)
    }
    return { _store, topics }
}



const getData = (_store) => (topic) => _store[topic].data



const setData = (_store) => (msgs, sub) => {
    const topics = msgs.reduce((acc, cur) => {

        const prevStore = _store[cur.topic]

        const temp = {
            [cur.topic]: {
                data: prevStore ? { ...prevStore['data'], ...cur.data } : { [Symbol.toStringTag]: cur.topic, ...cur.data },
                subs: prevStore ? [...prevStore['subs']] : []
            }
        }

        Object.assign(_store, temp)
        acc.push(cur.topic)

        return acc

    }, [])

    return { _store, topics, sub }
}


const pubSubPipe = (msgs, subs) => [ pipe( setData(msgs, subs), subscribe, ack )]








module.exports = { pipe, ack, subscribe, getData, setData, pubSubPipe, subscribe, ack, getData, pubSubPipe }
