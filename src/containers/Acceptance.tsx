import * as React from "react";
import { db } from "../firebase/firebase";
import { connect } from "react-redux";
import Acceptance, { AcceptanceItem } from "../components/Acceptance";
import { allState } from "../actions/index";

interface ContainerAcceptanceIProps {
  uid: string;
}

const ContainerAcceptance: React.FC<ContainerAcceptanceIProps> = ({ uid }) => {
  const [acceptance, setAcceptance] = React.useState<AcceptanceItem[]>([]);
  React.useEffect(() => {
    let acceptance: AcceptanceItem[] = [];
    const getFireData = async () => {
      const querySnapshot = await db
        .collection("users")
        .where("uid", "==", uid)
        .orderBy("ID")
        .get();
      querySnapshot.forEach((doc) => {
        if (doc.data().presentHistory) {
          for (let i = 0; i < doc.data().presentHistory.length; i++) {
            if (doc.data().presentHistory[i].FORorTO === "TO") {
              acceptance.push(doc.data().presentHistory[i]);
            }
          }
        }
      });
      setAcceptance(acceptance);
    };
    getFireData();
  }, [uid]);

  return <Acceptance acceptance={acceptance} />;
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
  };
};

export default connect(mapStateToProps)(ContainerAcceptance);
