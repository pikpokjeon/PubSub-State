# PubSub-State<a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fpikpokjeon%2FPubSub-State&count_bg=%23FFAD0F&title_bg=%23555555&icon=&icon_color=%23984040&title=%EB%B0%A9%EB%AC%B8%EC%9E%90&edge_flat=true"/></a>
> ### <bold> State management inspired by Publish-Subscribe messaging Pattern</bold>
---
### Example Projects which have used this library.
#### 1.[Summoner search page](https://github.com/pikpokjeon/summoner-search-page2)
#### 2.[Calendate-js](https://github.com/pikpokjeon/calendate-js)

[NPM Package](https://www.npmjs.com/package/pubsub-state)
- Working on Documentation
# How to use
### Store instantiation
``` javascript
import {Pubsub} from 'pubsub'

// When there is predefined state data
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

const store = Pubsub(predefinedData)

// When there is no initial data
const store = Pubsub()


```

### Publish data

#### store.publish(topic, object data) 

- It creates new topic when there's no applicable topic in the store
``` javascript
store.publish('chartData', {dataLength:10})

```
- If there's an existing topic in the store, it applies to it
``` javascript
store.publish('chartEvent', {lastIdx:5}) 

```
### Subscribe Topic
#### store.subscribe(topic, function) 
- Register subscriber function to a specific Topic
Subscriber functions will be called when ```store.action``` is executed.
``` javascript
store.subscribe('chartEvent', (data) => console.log(data))
store.subscribe('chartEvent', (data) => console.log(data.lastIdx + 1))
```
```
    chartEvent: {
        lastIdx: -1,
        selectedIdx: {start: -1, end: -1},
        sub:[
        (data) => console.log(data),
        (data) => console.log(data.lastIdx + 1),

    }
```
### Mutate Data by Action
#### store.action(topic, anonym function with topic's data arguments)
- It mutates the target topic's data and executes all subscribers passing the topic's data as arguments
- ```store.action```'s second argument (anonym function)' parameter is the topic's data. You need to return corresponding data object to mutate the topic's data.

``` javascript
store.action('chartEvent', ({lastIdx}) => {
    const tempIdx = lastIdx > 0 ? 10 : 2
    return ({lastIdx:tempIdx})
})

```
- Then it executes all target topic's subscribers
```
    chartEvent: {
        lastIdx: 2,
        selectedIdx: {start: -1, end: -1},
        sub:[
        (data) => console.log(data),            //1
        (data) => console.log(data.lastIdx + 1),//2

    }
```
``` javascript
// 1 >{
        lastIdx: 2,
        selectedIdx: {start: -1, end: -1
    }
// 2 >3
        
```
