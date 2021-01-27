# Goodev blog - dev blog

Simple blog created with React.js

## Secreenshots

![temp]()

## Technologies

- React JS v17.0.1

## Setup

To run this project, install it locally using yarn:

```
$ cd goodev
$ yarn
$ yarn start
```


ISSUE:  01.21.2020
infinite scroll 기능 구현 중
=> scroll 시 발생하는 event가 특정 조건을 만족할 경우 setValue를 하고 이 value를 바탕으로 data를 fetch 하는 기능을 구현함
=> event handler 에서 setValue가 올바르게 동작하지 않음
=> 알고보니 setValue는 동작하지만 value값을 가져오는데에 문제가 있음을 확인
=> 기존 value에서 + @를 한 값을 setValue하는 기능에서 기존 value값이 update가 되지 않음
=> 즉 value가 latest value가 아님
=> handler 내부에서 value를 update 해도 event 등록 시의 value만 출력됨
=> ...ing
