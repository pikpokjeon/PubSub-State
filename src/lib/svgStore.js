

export const Store = (initArr) =>
{
    const _store = {
        subs: []
    }

    if (initArr)
    {
        initArr.reduce((obj, value) =>
        {
            const [topic, data] = value; publish(topic, data)
            return obj
        },_store)
    }
 
    const publish = (topic, ...data) => updateData({
        topic,
        data: [...data].reduce((obj, cur) => ({...obj, ...storeDataByType(obj, topic, cur)}), {[topic]: {subs:[]}})
    }))
    
    const storeDataByType = (copied,topic,data) =>
    {
        if (isType.array(data)) 
        {
            if (!copied[el]) copied[topic][el] = {}
            data.forEach(([name, data]) => Object.assign(copied[topic][el], ({[name]: data})))
        }
        else if (isType.object(data)) // 두번째 인자가 데이터 객체인경우
        {
            Object.assign(copied[topic], {data: data})
        }
        if (data) Object.assign(copied[topic], {data})

        return copied
    }

    const pushSubs = ({topic, fn}) => {_store[topic][sub].push([...fn]); return {topic}}
    
    const notify = ({topic}) => _store[topic][sub].forEach(f => f())

    const updateData = ({topic,[data ?? el]: data}) => pipe({topic,data},setData,notify)
  
    const setData = ({topic, [data ?? el]: data}) => {Reflect.set(_store[topic], data); return {topic}}

    const getData = ({topic}) => _store[topic]

    const subscribe = (topic,...fn) => pipe({topic,fn}, pushSubs, notify)

    const action = (topic, fn) => (...args) => updateData({topic, data: fn(...args, getData({topic}))})
    

    return {publish,subscribe, action, setData, getData}
}
