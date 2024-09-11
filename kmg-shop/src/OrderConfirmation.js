import React, { useEffect, useState } from 'react';
import './App.css';

function OrderConfirmation() {
  const [order, setOrder] = useState(null); 
  const orderId = '12345';

 
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/orders/${orderId}`);
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error('Erro ao carregar os detalhes do pedido:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const goToHome = () => {
    window.location.href = '/';
  };


  if (!order) {
    return <div>Carregando...</div>;
  }


  return (
    <div className="container">
      <div className="store-name">KMG SHOP</div>
      <h1>Pedido Confirmado</h1>
      <div className="order-details">
        <p><strong>ID do Pedido:</strong> {order.id}</p>
        <p><strong>Cliente:</strong> {order.customer_name}</p>
        <p><strong>Itens:</strong> {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}</p>
        <p><strong>Total:</strong> R$ {order.total_price}</p>
      </div>
      <button className="btn" onClick={goToHome}>Voltar à Loja</button>
    </div>
  );
}

export default OrderConfirmation;
