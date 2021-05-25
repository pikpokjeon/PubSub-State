const { pipe } = require('./helper.js')

// import { Store, predefinedData } from './store'

/**
 * 
 * @param {*} msg 개수에 상관없이 [] 배열에 초기에 저장할 객체 전달
 * @param {*} sub 스토어를 구독할 구독자(함수)를 배열에 담아 전달
 */
const Store = (msg, sub) =>
{

    let _store = {}



    const pubSubPipe = (msgs, subs) => [ pipe( setData(msgs, subs), subscribe, ack ) ]


    // return { setData, pubSubPipe, subscribe, ack, getData: getData(_store) }

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



export {store}
