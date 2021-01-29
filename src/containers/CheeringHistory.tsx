import * as React from "react";
import { db } from "../firebase/firebase";
import { connect } from "react-redux";
import CheeringHistory, {
  CheeringHistoryItem,
} from "../components/CheeringHistory";
import { allState } from "../actions/index";

interface ContainerCheeringHistoryIProps {
  uid: string;
}

const ContainerCheeringHistory: React.FC<ContainerCheeringHistoryIProps> = ({
  uid,
}) => {
  const [cheeringHistory, setCheeringHistory] = React.useState<
    CheeringHistoryItem[]
  >([]);
  React.useEffect(() => {
    let cheeringHistory: CheeringHistoryItem[] = [];
    const getFireData = async () => {
      const querySnapshot = await db
        .collection("users")
        .where("uid", "==", uid)
        .orderBy("ID")
        .get();
      querySnapshot.forEach((doc) => {
        if (doc.data().presentHistory) {
          for (let i = 0; i < doc.data().presentHistory.length; i++) {
            if (doc.data().presentHistory[i].FORorTO === "FOR") {
              cheeringHistory.push(doc.data().presentHistory[i]);
            }
          }
        }
      });
      setCheeringHistory(cheeringHistory);
    };
    getFireData();
  }, [uid]);

  return <CheeringHistory cheeringHistory={cheeringHistory} />;
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
  };
};

export default connect(mapStateToProps)(ContainerCheeringHistory);
