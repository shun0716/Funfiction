import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { db, datetime } from "../firebase/firebase";
import { setPoint } from "../actions/myPage";
import { UnionedAction, allState } from "../actions/index";
import { Action, Dispatch } from "redux";

interface CheckoutIProps {
  price: number;
  cash: number;
  setPoint: (num: number) => UnionedAction;
  uid: string;
  point: number;
}

const stripeApiKey: any = process.env.REACT_APP_STRIPE_API_KEY;
const checkoutUrl =
  "https://us-central1-hew-funfiction.cloudfunctions.net/charge";

const Checkout: React.FC<CheckoutIProps> = ({
  price,
  cash,
  uid,
  setPoint,
  ...props
}) => {
  const handleToken = (token) => {
    fetch(checkoutUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token,
        charge: {
          amount: cash,
          currency: "JPY",
        },
      }),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        db.collection("users")
          .where("uid", "==", uid)
          .orderBy("ID")
          .get()
          .then((d) => {
            const did = d.docs[0].id;
            const Uid = d.docs[0].data().uid;
            const Name = d.docs[0].data().Name;
            const havePoint: number = d.docs[0].data().Point;
            const useEment: number = d.docs[0].data().settlement;
            const nowData = datetime();
            db.collection("settlementHistory")
              .get()
              .then((i) => {
                db.collection("settlementHistory")
                  .add({
                    ID: i.size + 1,
                    Name: Name,
                    uid: Uid,
                    Point: price,
                    Amount: cash,
                    Settlement: nowData,
                  })
                  .then(() => {
                    console.log("書き込み成功");
                  });
              });

            db.collection("users")
              .doc(did)
              .update({
                Point: havePoint + price,
                settlement: useEment + cash,
                updateTime: nowData,
              });
            // ここでポイント残高増やす
            setPoint(props.point + price);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <StripeCheckout
      stripeKey={stripeApiKey}
      token={handleToken}
      name="ポイント購入"
      amount={cash}
      panelLabel="{{amount}}"
      currency="JPY"
      locale="ja"
      allowRememberMe={false}
      label="ポイント購入"
      image="/icons/coin.png"
    >
      <div className="checkout_wrap">
        <img src="/icons/coin.png" alt="coin" />
        <p>{price}</p>
        <p className="checkout_cash">¥{cash}</p>
      </div>
    </StripeCheckout>
  );
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
    point: state.myPageReducer.point,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  setPoint: (num: number) => dispatch(setPoint(num)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
