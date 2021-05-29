# PubSub-State
> ### <bold> PubSub 패턴에 영감을 받은 앱의 데이터 상태를 관리하는 라이브러리 </bold>
---

 ``` 
 다중 함수가 같은 출처의 동적 데이터에 접근하고 있다면, 어떻게 이 데이터의 변화를 추적하며 관리를 하면 좋을까요. 
 ```


  
- 다중 함수가 오리진이 같은 데이터를 사용한다면, 그 말은 곧 함수는 동기화 된 최신의 데이터를 가지거나, 
  일회성으로 Props형식으로 데이터를 자식으로 넘겨줍니다.
  
- 특정 주제로 묶은 데이터의 집합을 원하는 함수에게만 전달하고, 데이터가 함수에 전달 된 후, 
  함수가 호출되는 파이프를 만들어, 중간에 불필요한 기능적 간섭을 줄입니다.
  
- 위에서 언급한 바와 같이 데이터를 발행하는 주체는 데이터를 받는 주체를 몰라도 됩니다. 
  단지 발행자와 구독자 사이에는 데이터를 저장하는 상태 저장소와 메세지를 전달하는 브로커가 존재할 뿐입니다. 
  
- 구독자 함수는 그저 함수의 기능에만 집중합니다 (Reactive), 구독하는 데이터가 변경되었을 시 알아차리기만 하면 됩니다. (Ack) 
- 추가적으로 함수가 데이터를 구독하고, 메세지를 수신하고, 수신한 데이터를 사용하고, 
  새로운 데이터를 요청하는 상태를 저장소에 함께 저장한다면, 더 세밀하게 데이터의 변화주기를 추적할 수 있다고 생각합니다.


전역 변수를 사용하지 않기 위해, 그리고 공유하는 자원의 변화를 추적하는 여러 방법들을 찾아 보던 중,</br>
네트워크 방법론의 뿌리를 가진 PubSub Messaging 패턴을 알게 되었습니다.
( 이는 프론트엔드 프레임워크/라이브러리 상태관리 패턴인 Flux의 기반이 됩니다. )


< 작성중 >
https://pikpokjeon.github.io/posts/pubsubStore
