---
title: [effective js] item 2. js에서의 부동 소수점 숫자
subTitle: 정수형, 실수형 => double type / 비트 연산자 => 32bit integer
date: 2020-10-17 18:21:00 +0900
categories: effective js
---

대부분의 언어는 여러 종류의 숫자형 데이터를 가지지만 js에는 단 하나밖에 없다.

```javascript
typeof 17; // "number"
typeof 54.67; // "number"
typeof -2.3; // "number"
```

사실, js내의 모든 숫자는 64bit로 인코딩된 부동 소수점, 즉 흔히 'double'로 알려진 숫자이다. 즉, js의 정수형과 실수형 전부 같은 number 타입으로 관리가 된다.

특별한 경우에 한해 32비트 정수형으로 암묵적 형변환이 되는 경우가 있다. 비트단위 연산자를 사용할 경우 인자들은 32비트 big-endian 2의 보수 (32비트 정수형) 으로 암묵적 변환이 된다.

> 요약
>
> 1. 자바스크립트의 숫자는 double 정확도의 부동 소수점 숫자이다.
> 2. 정수형도 double 타입으로 저장된다.
> 3. 비트단위 연산자는 숫자를 32비트 부호가 있는 integer 처럼 처리한다.
