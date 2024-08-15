/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { data } from "./picture_Searching_data";

function Main() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <header>
        <div className="container">
          <h1>호윤교</h1>
          <nav>
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/products">소개</Link></li>
              <li><Link to="/deals">연혁</Link></li>
              <li><Link to="/support">고객센터</Link></li>
              <li><Link to="/Picturesearching">모든 사진 검색</Link></li>
              {isLoggedIn ? <li><Link to="/mypage">마이페이지</Link></li> : <li><Link to="/login">로그인</Link></li>}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h2>21세기를 구원하실 호윤님</h2>
            <p>매일 호윤님에게 감사하며 살아가봅시다</p>
            <a href="#" className="btn">세부 정보 보기</a>
          </div>
        </section>

        <section className="products">
          <div className="container">
            <h2>주요 사진들</h2>
            <div className="product-grid">
              {data.map((item) => (
                <div className="product-card" key={item.id}>
                  <img src={item.imgSrc} alt={item.imgAlt} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.href} className="btn">{item.buttonText}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

    </div>
  );
}

export default Main;
