import ContainerHome from "../../containers/Home";
import Library from "../../containers/Library";
import MyPage from "../../containers/MyPage";
import Search from "../../containers/Search";
import Books from "../../containers/Books";
import BookExplanation from "../../containers/BookExplanation";
import Read from "../../containers/Read";
import PointBuy from "../../containers/PointBuy";
import Acceptance from "../../containers/Acceptance";
import TermsOfService from "../../containers/TermsOfService";
import PrivacyPolicy from "../../containers/PrivacyPolicy";

export interface PageItem {
  exact?: boolean;
  path: string;
  component: React.FC;
}

export const pages: PageItem[] = [
  {
    exact: true,
    path: "/",
    component: ContainerHome,
  },
  {
    path: "/Search",
    component: Search,
  },
  {
    path: "/Library",
    component: Library,
  },
  {
    path: "/MyPage",
    component: MyPage,
  },
  {
    path: "/Books/:code",
    component: Books,
  },
  {
    path: "/BookExplanation/:code/:details",
    component: BookExplanation,
  },
  {
    path: "/Read",
    component: Read,
  },
  {
    path: "/PointBuy",
    component: PointBuy,
  },
  {
    path: "/ContainerAcceptance",
    component: Acceptance,
  },
  {
    path: "/TermsOfService",
    component: TermsOfService,
  },
  {
    path: "/PrivacyPolicy",
    component: PrivacyPolicy,
  },
];
