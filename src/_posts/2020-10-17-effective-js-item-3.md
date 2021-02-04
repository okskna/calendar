---
title: "[effective js] item 3. 암묵적인 형변환"
date: 2020-10-17 18:21:00 +0900
categories: 
  - javascript
tags:
  - effective js
toc: true
toc_sticky: true
---

#### 1. + 연산자

 

 \+ 연산자는 인자들의 데이터형에 따라 오버 로딩한다. 또한 + 연산자는 좌측에서 우측 방향으로 우선도를 갖는다.

```javascript
2 + 3;	// 5
"hello" + "world";	// "hello world"
2 + "3";	// "23"
1 + 2 + "3"; // "33"
```

 

#### 2. 비트단위 산술 연산자와 시프트 연산자

 

 item 2에서 말한 것처럼 비트단위 연산의 인자는 32bit 정수형으로 자동 형 변환된다.

```javascript
"8" | "1";	// 9
```

 

 

#### 3. null과 NaN

 

 산술 연산에서의 null은 0으로, 정의되지 않은 변수가 NaN으로 변환된다. 이런 형 변환은 예외를 발생시키지 않아 오류를 숨기기 쉽다.

 

 NaN값을 테스트하는 방법은 조금 까다롭다. 그 이유는 NaN 자신을 동등하지 않게 처리하기 때문이다.

```javascript
NaN !== NaN;	// true
```

 게다가, 표준 isNaN 라이브러리 함수는 스스로 암묵적인 형 변환 (값을 테스트하기 전에 인자를 숫자로 바꿈) 때문에 신뢰하기 어렵다.

```javascript
isNaN(NaN);	// true
isNaN("foo");	// true
isNaN(undefined);	// true
isNaN({});	// true
isNaN({ valueOf: "foo" });	// true
```

 직관적이지는 않지만 NaN을 테스트하기 위한 간결하고 신뢰할 만한 코딩 관례를 소개한다. **NaN**은 js에서 **자기 자신과 동일하지 않은 유일한 값**이다. 따라서 값이 NaN인지 아닌지는 자기 자신과의 동일함을 확인하여 테스트할 수 있다.

```javascript
var a = NaN;
a !== a;	// true
```

 

 

 

 

 

#### 4. 객체

 

 객체 또한 원시 데이터형(primitive)으로 강제 형 변환될 수 있다.

```javascript
Math.toString();	// "[object Math]"
JSON.toString();	// "[object JSON]"
```

 객체는 암묵적으로 toString 메서드가 호출되어 문자열로 변환된다. 유사하게, 객체는 valueOf 메서드를 통해 숫자로 변환될 수도 있다. 이를 이용하면 다음과 같은 메서드를 정의해 객체의 형변환을 제어할 수도 있다.

```javascript
"J" + { toString: () => "S" };	// "JS"
2 * { valueOf: () => 3 };	// 6
```

 객체가 만약 valueOf와 toString 메서드 둘 다를 포함하고 있다면 valueOf -> toString 순으로 실행된다.

```javascript
var obj = {
	toString: () => "[object MyObject]",
	valueOf:  () => 17
};

"object: " + obj;	// "object: 17"
```

valueOf는 숫자형을, toString은 동일한 값의 문자열 표현을 나타내는 것이 일반적이다.

 

 

#### 5. Truthiness(실제 true/false 가 아니지만, 암묵적인 강제 형변환에 의해 true나 false처럼 처리되는 값을 말함)

더보기

 따라서 undefined를 확인하기 위해서는 truthiness로 확인하는것 보다 typeof를 사용하여 확인하는것을 추천한다.

```javascript
// truthiness: 0과 undefined를 구별할 수 없다.
const point = (x, y) => {
	if (!x) x = 320;
    if (!y) y = 240;
    return {x, y};
}

// typeof: 0과 undefined를 구별할 수 있다.
const point = (x, y) => {
	if (typeof x === "undefined") x = 320;
    if (typeof y === "undefined") y = 240;
    return {x, y};
}
```

 





> 요약
>
> 1. 데이터형 에러는 암묵적인 강제 형변환에 의해 은밀하게 감춰질 수 있다.
> 2. 연산자는 인자의 데이터형에 따라 덧셈이나 문자열 병합으로 오버로딩된다.
> 3. 객체는 valueOf를 통해 숫자형으로, toString을 통해 문자열로 강제 형변환된다.
> 4. valueOf 메서드를 가지는 객체는 반드시 valueOf에 의해 생성되는 숫자 값의 문자열 표현을 생성하는 toString 메서드를 구현해야 한다.
> 5. undefined 값을 테스트할 때 truthiness를 사용하기보다는 typeof를 사용하거나 undefined와 비교하는 것이 좋다.
