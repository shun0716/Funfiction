import * as React from "react";
import TemporaryDrawer, { PageItem } from "../components/TemporaryDrawer";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import RestoreRoundedIcon from "@material-ui/icons/RestoreRounded";
import CardGiftcardRoundedIcon from "@material-ui/icons/CardGiftcardRounded";
import Auth from "./Auth";
import Registe from "./Registe";
import Acceptance from "./Acceptance";
import CheeringHistory from "./CheeringHistory";
import Information from "../components/Information";
import { connect } from "react-redux";
import { allState } from "../actions/index";

interface TemporaryDrawerIProps {
  uid: string;
  userName: string;
  point: number;
}

const ContainerTemporaryDrawer: React.FC<TemporaryDrawerIProps> = ({
  uid,
  ...props
}) => {
  const [disabled, setDisabled] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (uid !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [uid]);

  const pageItem: PageItem[] = [
    {
      name: "新規登録",
      icon: PersonAddRoundedIcon,
      component: Registe,
    },
    {
      name: "ログイン",
      icon: ExitToAppRoundedIcon,
      component: Auth,
    },
    {
      name: "お知らせ",
      icon: InfoRoundedIcon,
      component: Information,
    },
    {
      name: "応援履歴",
      icon: RestoreRoundedIcon,
      component: CheeringHistory,
    },
    {
      name: "受け取りBOX",
      icon: CardGiftcardRoundedIcon,
      component: Acceptance,
    },
  ];
  return (
    <TemporaryDrawer
      pageItem={pageItem}
      userName={props.userName}
      point={props.point}
      disabled={disabled}
    />
  );
};

const mapStateToProps = (state: allState) => {
  return {
    uid: state.myPageReducer.uid,
    userName: state.myPageReducer.userName,
    point: state.myPageReducer.point,
  };
};

export default connect(mapStateToProps, {})(ContainerTemporaryDrawer);
