import * as React from "react";
import Checkout from "../components/Checkout";

interface PointBuyIProps {
  point: number;
}

const PointBuy: React.FC<PointBuyIProps> = ({ point }) => {
  return (
    <div className="point_buy_wrap">
      <div className="point_buy_notes_wrap">
        <div className="point_buy_all_point">
          <p className="point_buy_have_point">保有ポイント：</p>
          <img src="/icons/coin.png" alt="point" />
          <p className="point_buy_view_point">{point}</p>
        </div>
        <div className="point_buy_notes_box">
          <p>
            本サイトで購入したポイントは、本サイトのみで利用できます。また、購入するポイント数によって1ポイントの単価が異なるので、購入の際は必ずご確認ください。未成年の方がポイントを購入するには、保護者の方の同意が必要です。
          </p>
        </div>
      </div>
      <div className="point_buy_notes_wrap">
        <Checkout price={100} cash={120} />
        <Checkout price={500} cash={600} />
        <Checkout price={1000} cash={1200} />
        <Checkout price={2000} cash={2400} />
        <Checkout price={3000} cash={3600} />
        <Checkout price={5000} cash={6000} />
        <Checkout price={10000} cash={12000} />
      </div>
    </div>
  );
};

export default PointBuy;
