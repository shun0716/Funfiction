import * as React from "react";
import Search, { IKeys } from "../components/Search";
import { connect } from "react-redux";
import { Action, Dispatch } from "redux";
import { clearState } from "../actions/navigation";
import { titleChange } from "../actions/navigation";
import { setSearchResultPosts } from "../actions/search";
import { UnionedAction } from "../actions/index";

interface ContainerSearchIProps {
  searchResultPosts: Array<IKeys>;
  clearState: () => UnionedAction;
  titleChange: (title: string) => UnionedAction;
  setSearchResultPosts: (result: Array<object>) => UnionedAction;
}

const algoliasearch = require("algoliasearch");
const client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID,
  process.env.REACT_APP_ADMIN_API_KEY
);
export const index = client.initIndex("Practice");

const ContainerSearch: React.FC<ContainerSearchIProps> = ({
  searchResultPosts,
  clearState,
  titleChange,
  setSearchResultPosts,
}) => {
  React.useEffect((): void => {
    clearState();
  }, [clearState]);

  React.useEffect((): void => {
    titleChange("作品を探す");
  }, [titleChange]);

  const [trend, setTrend] = React.useState<boolean>(true);

  const hideTrend = (): void => {
    setTrend(false);
  };

  const onSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    let tempResults: Array<object> = [];
    await index
      .search({
        query: e.target.value,
      })
      .then((responses: { hits: [object] }) => {
        tempResults = responses.hits;
      });
    setSearchResultPosts(tempResults);
  };

  return (
    <Search
      onSearch={onSearch}
      searchResultPosts={searchResultPosts}
      trend={trend}
      hideTrend={hideTrend}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    searchResultPosts: state.searchReducer.searchResultPosts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  clearState: () => dispatch(clearState()),
  titleChange: (title: string) => dispatch(titleChange(title)),
  setSearchResultPosts: (result: Array<object>) =>
    dispatch(setSearchResultPosts(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerSearch);
