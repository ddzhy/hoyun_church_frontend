import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mypage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    // 서버로부터 사용자 데이터를 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://hoyun-church-backend.vercel.app/mypage', {
          withCredentials: true, // 쿠키를 포함한 요청
        });
        
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setUserData(response.data);
        }
      } catch (err) {
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>마이 페이지</h2>
      <p>이름: {userData.name}</p>
      <p>이메일: {userData.email}</p>
    </div>
  );
};

export default Mypage;
