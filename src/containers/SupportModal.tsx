import * as React from "react";
import SupportDoneModal from "../components/SuppprtDoneModal";
import SupportModal from "../components/SupportModal";

interface SupportModalIProps {
  point: number;
  choicePoint: number;
  load: boolean;
  modal: boolean;
  isDoneModal: boolean;
  comment: string;
  support: () => void;
  pointSelection: (n: number) => void;
  isModalclose: () => void;
  isDoneModalClose: () => void;
  getComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContainerSupportModal: React.FC<SupportModalIProps> = ({ ...props }) => {
  const [item1, setItem1] = React.useState(false);
  const [item2, setItem2] = React.useState(false);
  const [item3, setItem3] = React.useState(false);
  const [item4, setItem4] = React.useState(false);
  const [item5, setItem5] = React.useState(false);
  const [item6, setItem6] = React.useState(false);
  const [item7, setItem7] = React.useState(false);
  const [item8, setItem8] = React.useState(false);
  const [item9, setItem9] = React.useState(false);

  const addSupport = () => {
    props.support();
    setItem1(false);
    setItem2(false);
    setItem3(false);
    setItem4(false);
    setItem5(false);
    setItem6(false);
    setItem7(false);
    setItem8(false);
    setItem9(false);
  };

  const itemClick1 = () => {
    if (item1 === false) {
      setItem1(true);
      props.pointSelection(100);
    } else {
      setItem1(false);
      props.pointSelection(-100);
    }
  };
  const itemClick2 = () => {
    if (item2 === false) {
      setItem2(true);
      props.pointSelection(300);
    } else {
      setItem2(false);
      props.pointSelection(-300);
    }
  };
  const itemClick3 = () => {
    if (item3 === false) {
      setItem3(true);
      props.pointSelection(500);
    } else {
      setItem3(false);
      props.pointSelection(-500);
    }
  };
  const itemClick4 = () => {
    if (item4 === false) {
      setItem4(true);
      props.pointSelection(1000);
    } else {
      setItem4(false);
      props.pointSelection(-1000);
    }
  };
  const itemClick5 = () => {
    if (item5 === false) {
      setItem5(true);
      props.pointSelection(1500);
    } else {
      setItem5(false);
      props.pointSelection(-1500);
    }
  };
  const itemClick6 = () => {
    if (item6 === false) {
      setItem6(true);
      props.pointSelection(3000);
    } else {
      setItem6(false);
      props.pointSelection(-3000);
    }
  };
  const itemClick7 = () => {
    if (item7 === false) {
      setItem7(true);
      props.pointSelection(5000);
    } else {
      setItem7(false);
      props.pointSelection(-5000);
    }
  };
  const itemClick8 = () => {
    if (item8 === false) {
      setItem8(true);
      props.pointSelection(7500);
    } else {
      setItem8(false);
      props.pointSelection(-7500);
    }
  };
  const itemClick9 = () => {
    if (item9 === false) {
      setItem9(true);
      props.pointSelection(10000);
    } else {
      setItem9(false);
      props.pointSelection(-10000);
    }
  };

  const supportItemRamen = [
    {
      item1: item1,
      function: () => {
        itemClick1();
      },
      src: "/icons/ramen.png",
      alt: "ramen",
      name: "ラーメン",
      coin: "/icons/coin.png",
      num: 100,
    },
    {
      item1: item2,
      function: () => {
        itemClick2();
      },
      src: "/icons/ramen.png",
      alt: "ramen",
      name: "出前ラーメン",
      coin: "/icons/coin.png",
      num: 300,
    },
    {
      item1: item3,
      function: () => {
        itemClick3();
      },
      src: "/icons/ramen.png",
      alt: "ramen",
      name: "ラーメン・極",
      coin: "/icons/coin.png",
      num: 500,
    },
  ];

  const supportItemSushi = [
    {
      item: item4,
      function: () => {
        itemClick4();
      },
      src: "/icons/sushi.png",
      alt: "sushi",
      name: "寿司",
      coin: "/icons/coin.png",
      num: 1000,
    },
    {
      item: item5,
      function: () => {
        itemClick5();
      },
      src: "/icons/sushi.png",
      alt: "sushi",
      name: "回転寿司",
      coin: "/icons/coin.png",
      num: 1500,
    },
    {
      item: item6,
      function: () => {
        itemClick6();
      },
      src: "/icons/sushi.png",
      alt: "sushi",
      name: "回らない寿司",
      coin: "/icons/coin.png",
      num: 3000,
    },
  ];

  const supportItemMeat = [
    {
      item: item7,
      function: () => {
        itemClick7();
      },
      src: "/icons/yakiniku.png",
      alt: "meat",
      name: "焼肉",
      coin: "/icons/coin.png",
      num: 5000,
    },
    {
      item: item8,
      function: () => {
        itemClick8();
      },
      src: "/icons/yakiniku.png",
      alt: "meat",
      name: "中級焼肉",
      coin: "/icons/coin.png",
      num: 7500,
    },
    {
      item: item9,
      function: () => {
        itemClick9();
      },
      src: "/icons/yakiniku.png",
      alt: "meat",
      name: "高級焼肉",
      coin: "/icons/coin.png",
      num: 10000,
    },
  ];
  return (
    <React.Fragment>
      <SupportModal
        modal={props.modal}
        isModalclose={props.isModalclose}
        comment={props.comment}
        getComment={props.getComment}
        point={props.point}
        choicePoint={props.choicePoint}
        load={props.load}
        supportItemRamen={supportItemRamen}
        supportItemSushi={supportItemSushi}
        supportItemMeat={supportItemMeat}
        addSupport={addSupport}
      />
      <SupportDoneModal
        isDoneModalClose={props.isDoneModalClose}
        isDoneModal={props.isDoneModal}
      />
    </React.Fragment>
  );
};

export default ContainerSupportModal;
