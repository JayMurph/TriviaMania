import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { InfiniteListOuter, LeaderboardContainer } from "../../StyledElements";
import { GetCategoryQuizResultsPage } from "../../ApiCalls";
import { FlexColumnContainer, CenteredDiv } from "../../StyledElements";
import LeaderboardItem from "./LeaderboardItem";

export default class LeaderboardList extends React.Component {
  constructor(props) {
    super(props);
    let startPageNum = props.startPageNum || 1;
    let endPageNum = props.endPageNum || startPageNum;

    this.state = {
      category: props.category,
      items: props.initialItems,
      fetching: false,
      initialPageNum: startPageNum,
      initialIdx: ((startPageNum - 1) * 10) + 1,
      lastLoadedPageNum: endPageNum,
      hasMoreItems: true,
      focusItemIdx: props.focusItemIdx || -1,
    };

    this.focusItemRef = React.createRef();
  }

  /**
   * Retrieves next page of leaderboard items from backend and adds to itsm to
   * display
   */
  fetchNextPage = async () => {
    if (this.state.fetching === true) {
      return;
    }

    this.setState({ fetching: true });
    const pageToLoad = this.state.lastLoadedPageNum + 1;

    try {
      await GetCategoryQuizResultsPage(this.state.category, pageToLoad)
        .then((res) => res.json())
        .then(async (res) => {
          if (res.length > 0) {
            this.setState({
              items: [...this.state.items, ...res],
              lastLoadedPageNum: pageToLoad,
            });
          } else {
            this.setState({ hasMoreItems: false });
          }
        })
        .catch((err) => {
          this.setState({ hasMoreItems: false });
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({ fetching: false });
    }
  };

  loader() {
    return (
      <CenteredDiv key="loader" className="loader">
        <b>Loading ...</b>
      </CenteredDiv >
    );
  }

  // scroll focused item to top
  async componentDidMount() {
    if (this.state.focusItemIdx !== -1 && this.focusItemRef.current) {
      this.focusItemRef.current.scrollItemToTop();
    }
  }

  render() {
    return (
      <InfiniteListOuter>
        <FlexColumnContainer
          style={{
            overflow: "auto",
            height: "100%",
            width: "90%",
            alignSelf: "center",
          }}
        >
          <InfiniteScroll
            pageStart={this.state.initialPageNum}
            loader={this.loader()}
            loadMore={this.fetchNextPage}
            hasMore={this.state.hasMoreItems}
            threshold={5}
            useWindow={false}
          >
            <LeaderboardContainer>
              {this.state.items.map((hs, idx) => {
                let currItemIdx = this.state.initialIdx + idx;
                if (currItemIdx === this.state.focusItemIdx) {
                  // create special focused item that we can scroll to top
                  return (
                    <LeaderboardItem
                      ref={this.focusItemRef}
                      giveFocus={true}
                      userId={hs.userId}
                      score={hs.finalScore}
                      timeStamp={hs.timeStamp}
                      idx={currItemIdx}
                      key={currItemIdx}
                    />
                  );
                } else {
                  return (
                    <LeaderboardItem
                      userId={hs.userId}
                      score={hs.finalScore}
                      timeStamp={hs.timeStamp}
                      idx={currItemIdx}
                      key={currItemIdx}
                    />
                  );
                }
              })}
            </LeaderboardContainer>
          </InfiniteScroll>
        </FlexColumnContainer>
      </InfiniteListOuter>
    );
  }
}
