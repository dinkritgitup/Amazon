import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import classes from './Order.module.css'
import LayOut from '../../Components/Header/LayOut/LayOut';
import { db } from '../../Utility/firebase';
import { useContext } from 'react';
import { DataContext } from '../../Components/Header/DataProvider/DataProvider';

function Orders() {
  const location = useLocation();
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const msg = location.state?.msg;

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).collection("orders").orderBy("created", "desc").onSnapshot((snapshot) => {
        setOrders(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })));
      });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          {msg && <div className={classes.confirmation_msg}>{msg}</div>}
          <h2>Your Orders</h2>
          {orders?.length === 0 ? (
            <p style={{padding:"20px"}}>You have no orders yet.</p>
          ) : (
            orders.map((eachOrder,i) => (
              <div key={i} className={classes.order}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>

                <p>Amount: ${eachOrder.data.amount / 100}</p>
                <p>
                  Created:{" "}
                  {new Date(eachOrder.data.created * 1000).toLocaleDateString()}
                </p>
                <div className={classes.order_items}>
                  {eachOrder.data.basket.map((item) => (
                    <div key={item.id} className={classes.order_item}>
                      <img src={item.image} alt={item.title} />
                      <div>
                        <p>{item.title}</p>
                        <p>Quantity: {item.amount}</p>
                        <p>Price: ${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
