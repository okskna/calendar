import React from 'react';
import {AiFillGithub} from 'react-icons/ai';
import {ImMail4} from 'react-icons/im';

import './About.css';

function About () {
  return (
    <>
      <div className="About">
        <span className="About-title">김선관은 프론트엔드 개발자가 되는 중입니다.</span>
        <p className="About-paragraph">
          애자일 삶을 살기위해 노력하는 예비 프로그래머 💻<br/>
          자신의 코드에 신랄한 비판을 내려줄 사람을 찾는중 👀<br/>
          <br/>
          자신있는 언어:  <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript" className="en">JavaScript</a><br/>
          찍어먹어본 언어:  <span className="en">C, C++, Python, Java, Matlab</span><br/>
          사용해본 기술들:  <span className="en">React.js / Next.js / MySql / Graphql / Sequlize.js / Express.js</span><br/>
          <br/>
          맥주 한 잔도 간신히 먹는 알콜쓰레기 🍺😖<br/>
          동물을 좋아하는 동물같은 사람 🐶🐾🦮🐕‍🦺<br/>
          <br/>
          지금 읽고있는 책:  <a href="https://www.amazon.com/Effective-JavaScript-Korean-David-Herman/dp/8966260853/ref=sr_1_2?crid=F84OWU2PNPCB&dchild=1&keywords=effective+javascript+by+david+herman&qid=1610612035&sprefix=effective+javascript+by%2Cstripbooks-intl-ship%2C320&sr=8-2" className="en">Effective JS</a><br/>
          <div className="About-icons-wrapper">
            <span className="en">
              <a href="https://github.com/okskna">Github</a> / <a href="mailto:okskna@gmail.com">Email</a>
            </span>
            {/* <a href="https://github.com/okskna"> */}
              {/* <span className="en">Github</span> */}
              {/* <AiFillGithub className="About-icon github" /> */}
            {/* </a> */}
            {/* <span className="en">/</span> */}
            {/* <a href="mailto:okskna@gmail.com"> */}
              {/* <span className="en">Email</span> */}
              {/* <ImMail4 className="About-icon mail" /> */}
            {/* </a> */}
          </div>
        </p>
      </div>
    </>
  );
}

export default About;