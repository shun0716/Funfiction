import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import PersonSharpIcon from "@material-ui/icons/PersonSharp";

interface BottomNavItem {
  label: string;
  value: string;
  icon: React.ComponentClass | React.FC;
  to: string;
}

export const items: BottomNavItem[] = [
  {
    label: "ホーム",
    value: "home",
    icon: HomeRoundedIcon,
    to: "/"
  },
  {
    label: "検索",
    value: "search",
    icon: SearchRoundedIcon,
    to: "/Search"
  },
  {
    label: "お気に入り",
    value: "library",
    icon: StarBorderRoundedIcon,
    to: "/Library"
  },
  {
    label: "マイページ",
    value: "mypage",
    icon: PersonSharpIcon,
    to: "/MyPage"
  }
];
