---
title: "[effective js] item 5. 혼합된 데이터형을 ==로 비교하지 마라."
date: 2020-10-20 17:39:00 +0900
categories: effective js
---



 다음 표현식의 값을 예상해보자.

```javascript
"1.0e0" == { valueOf: () => true };
```

 위의 두 값은 == 연산자에 의해 동등하다고 간주된다. item 3 에서 설명한 암묵적인 강제 형변환에 의해 두 값이 숫자로 변환되기 때문이다.



 웹 양식에서 값을 읽어와 숫자와 비교하는 작업에도 이런 강제 형변환을 사용하곤 한다.

```javascript
var today = new Date();

if (form.month.value == (today.getMonth() + 1) &&
    form.day.value == today.getDate()) {
    // 생일 축하합니다!
    // ...
}
```

 하지만 사실, 값을 숫자로 명시적으로 변환하기는 매우 쉽다. number 함수나 단일 + 연산자를 사용하면 된다.

```javascript
var today = new Date();

if (+form.month.value == (today.getMonth() + 1) &&
    +form.day.value == today.getDate()) {
    // 생일 축하합니다!
    // ...
}
```

 더 나은 방법으로 엄격한 동일 비교 연산자(===)를 사용할 수 있다.

```javascript
var today = new Date();

if (+form.month.value === (today.getMonth() + 1) &&
    +form.day.value === today.getDate()) {
    // 생일 축하합니다!
    // ...
}
```



 두 인자가 동일한 데이터형이라면 ==이나 ===이나 아무런 차이가 없다. 하지만 코드를 읽는 사람에게 형변환이 연관되지 않는다는 점을 확실히 보여주는 더 좋은 방법은 ===연산자를 사용하는 것이다. 그렇지 않으면 코드의 동작을 판독하기 위해 정확한 강제 형변환 법칙을 다시 상기시켜 주어야 한다.


 연산자의 강제 형변환 규칙은 다음 표와 같다.
 

| 인자 타입 1           | 인자 타입 2                 | 강제 형변환                                                  |
| --------------------- | --------------------------- | ------------------------------------------------------------ |
| *null*                | *undefined*                 | 없음; 항상 true                                              |
| *null* or *undefined* | not (*null* or *undefined*) | 없음; 항상 false                                             |
| primitive data type   | *Date obj*                  | primitive type => 숫자;<br />Date obj => primitive(toString 후 valueOf) |
| primitive data type   | *obj*(not *Date*)           | primitive type => 숫자;<br />Date obj => primitive(valueOf후 toString) |
| primitive data type   | primitive data type         | primitive type => 숫자;                                      |

---

>  요약
>
> 1. == 연산자는 인자들이 서로 다른 데이터형일 때, 일련의 혼동스러운 암묵적인 강제 형변환을 적용시킨다.
> 2. 비교가 어떠한 암묵적인 강제 형변환과도 연관이 없다는 사실을 코드를 읽는 사람에게 명확하게 전달하기 위해서 ===를 사용하라.
> 3. 비교할 값이 서로 다른 데이터형이라면 프로그램의 동작을 더 명백히 하기 위해 직접 명시적인 강제 형변환을 사용하라.(ex: +를 이용한 형변환)
