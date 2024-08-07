import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Hangul from 'hangul-js';
import { data } from "./picture_Searching_data";

function Picturesearching() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const includesHangul = (text, query) => {
    const disassembledText = Hangul.disassemble(text.replace(/\s/g, '')).join('');
    const disassembledQuery = Hangul.disassemble(query.replace(/\s/g, '')).join('');
    return disassembledText.includes(disassembledQuery);
  };

  const filteredData = data.filter((item) => {
    const lowerSearch = search.toLowerCase().replace(/\s/g, '');
    return lowerSearch === '' || 
      item.title.toLowerCase().replace(/\s/g, '').includes(lowerSearch) || 
      includesHangul(item.title, search);
  });

  return (
    <div className="App">
      <button onClick={() => navigate('/')} className="back-button">
        <i className="fa-solid fa-house"></i> 
      </button>
      <br/>

      <div className="search-container">
        <input onChange={(e) => setSearch(e.target.value)} type="text" className="search-input" placeholder="검색어를 입력하세요..." />
        <button type="submit" className="search-button">검색</button>
      </div>

      <div className="container">
        <h2>주요 상품 카테고리</h2>
        <div className="product-grid">
          {filteredData.map((item) => (
            <div className="product-card" key={item.id}>
              <img src={item.imgSrc} alt={item.imgAlt} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a href={item.href} className="btn">{item.buttonText}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Picturesearching;
