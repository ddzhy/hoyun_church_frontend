/* eslint-disable */


import React from 'react'
import picture_1 from "./images/picture_1.jpg"
import picture_2 from "./images/picture_2.jpg"
import picture_3 from "./images/picture_3.jpg"
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';


function Main () {

  const { isLoggedIn } = useAuth();

  return (
    <div>
        <header>
        <div className="container">
            <h1>쌈뽕이 사이트</h1>
            <nav>
            <ul>
                <li><Link to="/">홈</Link></li>
                <li><Link to="/products">제품</Link></li>
                <li><Link to="/deals">특가</Link></li>
                <li><Link to="/support">고객센터</Link></li>
                <li><Link to="/Picturesearching">모든 사진 검색</Link></li>
                {isLoggedIn ? <Link to="/mypage">마이페이지</Link> : <Link to="/login">로그인</Link>}

            </ul>
            </nav>
        </div>
        </header>

        <main>
            <section class="hero" >
                <div class="container">
                    <h2>새로운 사진 무료 다운!</h2>
                    <p>매일 새로운 사진을 만나보세요.</p>
                    <a href="#" class="btn">세부 정보 보기</a>
                </div>
            </section>

            <section class="products">
            <div class="container">
                <h2>주요 상품 카테고리</h2>
                <div class="product-grid">
                    <div class="product-card">
                        <img src={picture_1} alt="Product 1" i/>
                        <h3>상품 제목 1</h3>
                        <p>상품 설명이 들어갑니다.</p>
                        <a href="#" class="btn">구매하기</a>
                    </div>
                    <div class="product-card">
                        <img src={picture_2} alt="Product 2"/>
                        <h3>상품 제목 2</h3>
                        <p>상품 설명이 들어갑니다.</p>
                        <a href="#" class="btn">구매하기</a>
                    </div>
                    <div class="product-card">
                        <img src={picture_3} alt="Product 3"/>
                        <h3>상품 제목 3</h3>
                        <p>상품 설명이 들어갑니다.</p>
                        <a href="#" class="btn">구매하기</a>
                    </div>
                </div>
            </div>
        </section>
        
        </main>
        
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

    </div>
  )
}

export default Main;
