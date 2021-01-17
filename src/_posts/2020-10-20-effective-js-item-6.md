---
title: "[effective js] item 6. 세미콜론 삽입의 한계에 대해서 알아두자."
date: 2020-10-20 19:01:00 +0900
categories: effective js
---



 자바스크립트의 편리함 중 하나는 문장을 종료하는 세미콜론을 생략할 수 있다는 점이다. 세미콜론의 생략은 결과적으로 유쾌하고 가볍고 심미적인 코드를 만들어낸다.

```javascript
function Point(x, y) {
    this.x = x || 0
    this.y = y || 0
}

Point.prototype.isOrigin = function () {
    return this.x === 0 && this.y === 0
}

```

