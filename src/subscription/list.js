import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card } from './card';

export default function SubscriptionList() {
  const { categoryId } = useParams();
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    console.log('🔹 categoryId:', categoryId); // ✅ URL에서 가져온 카테고리 ID 확인

    axios.get(`http://localhost:8090/api/v1/subscription/category/${categoryId}`)
      .then(response => {
        console.log('✅ API 응답 데이터:', response.data);  // ✅ 응답 데이터 콘솔 출력
        setSubscriptions(response.data);
      })
      .catch(error => console.error('❌ Error fetching subscriptions:', error));
  }, [categoryId]);

  return (
    <div className="p-4 grid grid-cols-2 gap-6">
      {subscriptions.map((sub) => (
        <Card key={sub.id} name={sub.name} price={sub.price} imageUrl={sub.imageUrl} />
      ))}
    </div>
  );
}
