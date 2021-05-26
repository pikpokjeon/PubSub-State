const { pipe } = require('./helper')

// import { Store, predefinedData } from './store'

/**
 * 
 * @param {*} msg 개수에 상관없이 [] 배열에 초기에 저장할 객체 전달
 * @param {*} sub 스토어를 구독할 구독자(함수)를 배열에 담아 전달
 */
const Store = (msgs, sub) =>
{

    let _store = {}


    const ack = ( {topics} ) => topics.reduce((_, topic) => pipe(_store[topic].data , ..._store[topic].subs), -1 )

    // const request
    
    
    const subscribe = ({ topics, sub }) => 
     {
        for (const topic of Array.from(topics)) {
            _store[topic].subs.push(...sub)
        }
        return { topics }
    }
    
    
    
    const getData = (_store) => (topic) => _store[topic].data
    
    
    
    const setData = (msgs, sub) => {
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
    
        return {  topics, sub }
    }
    
    
    const pubSubPipe = (msgs, sub) => [ pipe( setData(msgs, sub), subscribe, ack )]
    pubSubPipe(msgs, sub)
    
    return { setData, pubSubPipe: pubSubPipe, subscribe, ack, getData: getData(_store) }

}



/**
 * Store 생성자를 초기화 때와 분리한다
 * @param {*} msgs 데이터 정보
 * @param {*} subs 데이터를 구독하는 함수
 *   
 */

const store = (msgs, subs) =>
{
    const pubSubStore = Store(msgs, subs)
    pubSubStore.pubSubPipe(msgs, subs)

    return pubSubStore

}



module.exports = {store}
