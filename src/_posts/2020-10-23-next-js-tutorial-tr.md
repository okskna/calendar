### Client-Side Nav

Link 컴퍼넌트는 같은 next.js app에 있는 두 페이지 사이에서 client-side navigation이 가능하다.



Client-side nav는  js를 사용해서 그 페이지의 변화가 일어나는 것을 의미하고, 그것들은 브라우저에 의해 진행되는 기본 nav보다 빠르다.



검증할 수 있는 간단한 방법을 소개한다.

- 브라우저의 개발자도구를 사용해서 *<html>* 의 'background' CSS 속성을 'yellow' 로 바꿔라.
- 두 페이지 사이에서 뒤로가기와 앞으로가기 링크를 클릭해라.
- 페이지의 변화 사이에서 노란색 배경이 지속되는 것을 볼 수 있을것이다.

이것은 브라우저가 풀 페이지를 로드하지 않고 client-side navigation이 동작하는것을 보여준다.

![nextjs example 1](https://nextjs.org/static/images/learn/navigate-between-pages/client-side.gif)

<Link href="..."> 대신 <a href="..."> 를 사용했다면, 브라우저는 전체 새로고침을 하기 때문에 링크를 클릭하면 배경 색상은 지워질 것이다. 



### Code splitting and prefetching

Next.js는 코드 분할을 자동적으로 수행한다. 그래서 각 페이지들은 그 페이지에서 필요한 것들만 로드한다. 이것은 홈페이지가 render 되었을 때, 다른 페이지들의 코드는 초기에 가져오지 않음을 의미한다.



이것은 수백개의 페이지가 있다 할지라도, 홈페이지를 빠르게 로드함을 보장한다.



당신이 요청한 페이지만을 위한 코드를 로딩하는것은 페이지가 분리된다는 것을 의미한다. 어떤 페이지들에 에러가 발생하면, 앱의 나머지는 여전히 동작한다.



더욱이, Next.js의 프로덕션 빌드에서 Link 컴퍼넌트가 브라우저의 뷰포트

[^1]: 메뉴바, 탭영역 등을 제외한 순수 화면 영역의 크기를 말함

에 나타날 때마다 Next.js 는 자동적으로 백그라운드에서 링크된 페이지를 위한 코드를 prefetch한다. 링크를 클릭하면, 목적 페이지를 위한 코드는 이미 백그라운드에서 로드되어있을 것이며, 그 페이지의 변화는 거의 즉각적으로 일어난다.





### Summary

Next.js는 코드 분할, client-side navigation, prefetching을 통해 당신의 앱을 자동적으로 최적화하여 최고의 퍼포먼스를 제공한다.



page 파일 아래에 route를 만들고 기본으로 제공되는 link 컴퍼넌트를 사용해라. routing 라이브러리는 필요하지 않다.



---

**Note:** Next.js 앱 외부의 페이지에 링크가 필요하다면, Link를 빼고 <a> tag를 사용해라.

className과 같은 추가 속성이 필요하다면, <Link> tag에 추가하지 말고 <a> tag에 추가해라. [예시](https://github.com/vercel/next-learn-starter/blob/master/snippets/link-classname-example.js)

---







###  Assets, Metadata, and CSS

