import React from "react";
import {
  LeaderboardIndex,
  LeaderboardItemContainer,
  LeaderboardScore,
} from "../../StyledElements";
import { GetProfile } from "../../ApiCalls";

const MAX_SCORE = 8000;
const MIN_WIDTH_PERCENTAGE = 30;
const MIN_HEIGHT = 80;
const MIN_FONT_SIZE = 32;

const TOP_HEIGHT_INC = 15;
const TOP_FONT_SIZE_INC = 8;

export default class LeaderboardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      timeStamp: props.timeStamp,
      score: props.score,
      idx: props.idx,
      username: "",
    };
  }

  componentDidMount() {
    GetProfile(this.state.userId)
    .then((res)=>res.json())
    .then((profile)=>this.setState({username:profile.userName}))
    .catch((err)=>console.log(err));
  }

  render() {
    let width = (this.state.score / MAX_SCORE) * 100;
    width = width < MIN_WIDTH_PERCENTAGE ? MIN_WIDTH_PERCENTAGE : width;
    let height =
      this.state.idx >= 5
        ? MIN_HEIGHT
        : MIN_HEIGHT + TOP_HEIGHT_INC * (5 - this.state.idx);
    let fontSize =
      this.state.idx >= 5
        ? MIN_FONT_SIZE
        : MIN_FONT_SIZE + TOP_FONT_SIZE_INC * (5 - this.state.idx);
    return (
        <>
      <LeaderboardItemContainer
        style={{
          width: `${width}%`,
          alignSelf: "start",
          height: `${height}px`,
        }}
      >
        <LeaderboardIndex style={{ fontSize: `${fontSize}px` }}>
          {this.state.idx}
        </LeaderboardIndex>
        <div>{this.state.username}</div>
        <LeaderboardScore style={{ fontSize: `${fontSize}px` }}>
          {this.state.score}
        </LeaderboardScore>
      </LeaderboardItemContainer>
        </>
    );
  }
}