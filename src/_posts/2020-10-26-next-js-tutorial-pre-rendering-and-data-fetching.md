---
title: "[Next.js] tutorial: Pre-rendering and Data Fetching"
date: 2020-10-28 18:02:00 +0900
categories: Next.js
---



# Pre-rendering and Data Fetching



### Pre-rendering

data fetching에 대해 말하기 전에, Next.js 에서 중요한 개념중 하나인 Pre-rendering에 대해 말해본다.



기본적으로 Next.js 는 모든 페이지를 pre-render 한다. 이것은 Next.js가 클라이언트 측의 JavaScript 에서 모든 일을 수행하는것이 아닌 각 페이지를 위한 HTML을 미리 생성한다는 것을 의미한다. Pre-rendering은 퍼포먼스와 SEO에서 더 좋은 결과를 낼 수 있다.



생성된 각 HTML은 그 페이지에 필요한 최소한의 JavaScript 코드와 연결된다. 페이지가 브라우저로 로드되었을 때, 그것의 JavaScript 코드는 실행되고 페이지가 완전히 상호 작용하도록 만든다. (이 과정을 **Hydration** 이라 한다.)



### Check That Pre-rendering Is Happening

 다음 과정을 통해 pre-rendering이 발생하는지를 확인해볼 수 있다.

- 브라우저에서 JavaScript를 비활성화한다 ([크롬에서 비활성화 하는 방법](https://developers.google.com/web/tools/chrome-devtools/javascript/disable)). 그리고...
- [이 페이지](https://next-learn-starter.now.sh/)에 접속해본다. (이 튜토리얼의 마지막 결과물)

 앱이 JavaScript 없이 render된 것을 확인할 수 있을 것이다. 그것은 Next.js가 앱을 static HTML로 pre-render 했기 때문이다. 그리고 JavaScript 실행 없이 앱을 볼 수 있게 해준다.

---

**Note:** 'localhost' 에서도 위의 단계를 시도할 수 있다. 하지만 JavaScript를 비활성화 했다면 CSS는 로드되지 않을 것이다.

---

 만약 앱이 Next.js 가 없는 순수한 React.js 앱 이라면 pre-rendering은 없다. 그래서 JavaScript를 비활성화 할 경우 앱을 볼 수 없다. 예를 들어:

- 브라우저에서 JavaScript를 활성화하고 [이 페이지를 방문한다](https://create-react-app.now-examples.now.sh/). 이 페이지는 [Create React App](https://create-react-app.dev/) 으로 만들어진 순수한 React.js 앱이다.
- 이제, JavaScript를 비활성화하고 같은 페이지에 다시 접속한다.
- 더이상 앱을 볼 수 없을 것이다 - 대신에, "You need to enable JavaScript to run this app." 이라는 글을 볼 수 있을 것이다. 앱이 static HTML로 pre-render 되지 않았기 때문이다.



### Summary: Pre-rendering vs No Pre-rendering

 그림 요약: 

![Pre-rendering](https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png)

![No-pre-rendering](https://nextjs.org/static/images/learn/data-fetching/no-pre-rendering.png)





---

---

---



### Two Forms of Pre-rendering

 Next.js는 pre-rendering의 두 가지 형태를 갖고있다: [Static Generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended)과 [Server-side Rendering](https://nextjs.org/docs/basic-features/pages#server-side-rendering).

두 차이점은 언제 페이지를 위한 HTML을 생성했는가에 있다.

- Static Generation 은 **build time**에 HTML을 생성하는 pre-rendering 방법이다. 그런 다음 Pre-render된 HTML은 각 요청에서 재사용된다.
- Server-side Rendering 은 **각 요청시** HTML을 생성하는 pre-rendering 방법이다.

 

![Static Generation](https://nextjs.org/static/images/learn/data-fetching/static-generation.png)![Server-side Rendering](https://nextjs.org/static/images/learn/data-fetching/server-side-rendering.png)

---

개발자 모드(*'npm run dev'* 혹은 '*yarn dev*'로 실행한 경우) 에서는 모든 페이지들은 ( 심지어 Static Generation을 사용한 페이지 일지라도) 매 request 에 pre-render 된다.

---





###  Per-page Basis

 중요한것은, Next.js 는 각 페이지에 사용할 pre-render된 양식을 선택할 수 있다. 대부분의 페이지에 Static Generation을 사용하고 다른 페이지에 Server-side Rendering을 사용함으로써 "hybrid" Next.js 앱을 만들 수 있다. 

![](https://nextjs.org/static/images/learn/data-fetching/per-page-basis.png)





### When to Use Static Generation v.s. Server-side Rendering

 가능하면 Static Generation (data 포함 및 제외) 를 사용하는것을 추천한다. 페이지가 한 번 빌드되고 CDN이 제공할 수 있기 때문이다. 이렇게 하면 서버가 매 요청마다 페이지를 render하는것 보다 더 빨라진다.



 다음과 같은 다양한 페이지의 종류에 Static Generation을 사용할 수 있다:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation



 스스로 이런 질문을 할 수 있을 것이다: "사용자의 요청에 앞서 페이지를 pre-render 할 수 있을까?" 그에 대한 대답이 "예" 라면 Static Generation을 선택해야 한다.



 반면에, 사용자의 요청 이전에 페이지를 pre-render 할 수 없다면 Static Generation 은 좋은 생각이 아니다. 아마도 페이지는 빈번하게 data를 업데이트 하는 것을 보여줄 것이다. 그리고 그 페이지 내용은 매 요청마다 변할것이다.



 이 경우에서 Server-side Rendering을 사용할 수 있다. 그것은 좀 더 느리지만, pre-render된 페이지는 항상 최신일 것이다. 혹은 pre-rendering을 건너뛰고 빈번하게 업데이트되는 데이터를 채우기 위해 clident-side JavaScript를 사용할 수 있을 것이다.





### We'll Focus on Static Generation

 이번 레슨에서, Static Generation을 조명했다. 다음 페이지에서 우리는 데이터 포함 및 제외 상황에서의 Static Generation에 대해 말할 것이다.





---

---

---



### Static Generation with and without Data

 Static Generation 은 데이터 포함 및 제외 상황에서 수행될 수 있다.



 지금까지, 우리가 만들어온 모든 페이지들은 외부 데이터의 fetching이 필요하지 않았다. 그 페이지들은 앱이 프로덕션 용으로 빌드될 때 자동으로 Static Generate될 것이다.

![](https://nextjs.org/static/images/learn/data-fetching/static-generation-without-data.png)





 그러나, 몇몇 페이지들을 에는, 외부 데이터의 fetching 없이 HTML을 render할 수 없을 것이다. 아마도 file system에 엑세스하거나, 외부 api를 fetch하거나, 혹은 빌드 타임에서의 DB를 query 할 필요가 있을 것이다. Next.js 는 이런 경우(데이터를 사용한 Static Generation)를 즉시 지원한다.

![](https://nextjs.org/static/images/learn/data-fetching/static-generation-with-data.png)



### Static Generation with Data using 'getStaticProps'

 어떻게 동작할까?  Next.js에서 페이지 컴퍼넌트를 export 할 때, 'getStaticProps' 라 불리는 비동기 함수를 export 할 수 있다. 이렇게 한다면: 

- 'getStaticProps' 는 프로덕션 빌드 타임에 실행된다. 그리고...
- 함수 내부에, 외부 데이터터를 fetch할 수 있고 그것을 페이지의 props로 보낼 수 있다.

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
    // 파일 시스템, API, DB 등으로부터 외부 변수를 가져온다.
    const data = ...
    
    // props 키의 값은 Home 컴퍼넌트로 넘겨질 것이다.
    return {
        props: ...
    }
}
```

 본질적으로, 'getStaticProps' 는 Next.js에게 다음과 같이 말할것이다.: "이 페이지에는 몇몇개의 독립적인 데이터가 있어 - 그러니까 빌드 시 이 페이지를 pre-render 할 때, 그것들을 먼저 해결해야해!"

---

**Note:** 개발자 모드에서, 'getStaticPorps'는 각 요청시 동작한다.

---



### Let's Use 'getStaticProps'

  하면서 배우는 것이 더 쉽기 때문에 다음 페이지부터 getStaticProps를 사용하여 블로그를 구현할 것이다.





---

---

---



### Blog Data





