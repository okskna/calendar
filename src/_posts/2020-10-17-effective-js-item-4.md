---
title: "[effective js] item 4. 객체 래퍼보다 원시 데이터형을 우선시하라."
date: 2020-10-17 18:21:00 +0900
categories: effective js
---

 js 는 다섯 가지의 원시 데이터형 값을 갖는다. Boolean, 숫자, 문자열, null, undefined이 이에 해당한다. (typeof 연산자는 null의 데이터형을 "object"로 반환하지만, 표준은 null을 별도의 데이터형으로 기술한다.) 동시에 표준 라이브러리는 Boolean, 숫자 그리고 문자열을 객체처럼 래핑하는 생성자를 제공한다.

 다음과 같이 문자열 값을 감싸서 String 객체를 만들 수 있다.

```javascript
var s = new String("hello");
```

 이는 그 자신이 감싼 문자열과 비슷하게 동작한다. 하지만 **원시 데이터형 문자열과는 다르게, String 객체는 진짜 객체**다.

```javascript
typeof "hello";	// "string"
typeof s;		// "object"
```

 이 차이점은 매우 중요하다. 두 개의 서로 다른 String 객체를 내장 연산자를 사용해 비교할 수 없다는 의미이기 때문이다.

```javascript
var s1 = new String("hello");
var s2 = new String("hello");
s1 === s2	// false
s1 == s2	// false
```

 String 객체는 개별 객체이기 때문에 자기자신과만 동일하다. 엄격하지 않은 동일 비교 연산자도 마찬가지 결과다.



 이런 래퍼들이 존재하는 주된 이유를 합리화하자면 유틸리티 메서드들 때문이다. js는 암묵적인 강제 형변환에 이런 래퍼들을 편리하게 사용한다. 이로 인해 원시 데이터형의 메서드를 호출하거나 프로퍼티를 추출할 수 있게 되고, 값을 적당한 객체 타입으로 감싸서 사용한 것처럼 동작하게 된다. 

```javascript
"hello".toUpperCase();	// "HELLO"
```

 이런 암묵적인 감싸기의 결과로 원시 데이터 값에 기본적으로 아무런 영향을 주지 않고 프로퍼티를 설정할 수 있다. 다만, 암묵적인 감싸기는 실행될 때마다 매번 새로운 String 객체를 생성하기 때문에, 처음 감싸진 래퍼 객체를 갱신하더라도 효과는 지속되지 않는다. 

```javascript
"hello".someProperty = 17;
"hello".someProperty;	// undefined
```

 결국 실제로는 원시 데이터 값에 프로퍼티를 설정할 수 없다. 하지만 이런 동작을 이해하는 것은 도움이 된다. js가 데이터형 오류를 감추는 또 다른 사례이기 때문이다. 만약 객체라고 생각한 것에 프로퍼티를 설정했지만 실수로 원시 데이터형에 설정했다면..... 분석하기 힘들 것이다.





> 요약
>
> 1. 원시 데이터형을 위한 객체 래퍼는 그 자신의 원시 데이터 값과는 동작이 다르다. 동일한지 비교했을 때도 서로 다르다.
> 2. 원시 데이터형에 프로퍼티를 설정하거나 가져오면 암묵적으로 객체 래퍼를 생성한다.





