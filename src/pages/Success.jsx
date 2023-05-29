import { useEffect, useState } from "react";


const Success = () => {
  const [orderId, setOrderId] = useState(null);


  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Exitoso. Tu pedido está siendo preparado...`}
      <button style={{ padding: 10, marginTop: 20 }}>Ir a la página de inicio</button>
    </div>
  );
};

export default Success;
