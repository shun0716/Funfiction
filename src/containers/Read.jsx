import * as React from "react";
import { connect } from "react-redux";
import { readBar } from "../actions/navigation";
import { manga_src } from "../components/config/ReadData";

const Read = ({ readBar, ...props }) => {
  const mainWrapRef = React.createRef();
  const sliderBarRef = React.createRef();
  const [bar, setBar] = React.useState(true);
  const [pageNum, setPageNum] = React.useState(1);
  const [topPosition, setTopPosition] = React.useState();
  const [leftPosition, setLeftPosition] = React.useState();
  const [topAnimation, setTopAnimation] = React.useState();
  const [underAnimation, setUnderAnimation] = React.useState();
  const [maxPageModal, setMaxPageModal] = React.useState(true);
  const [nowPageModal, setNowPageModal] = React.useState(false);

  const shareTwitter =
    "https://twitter.com/intent/tweet?text=https://hew-fansa.web.app/";
  const shareFaceBook =
    "http://www.facebook.com/share.php?u=https://hew-fansa.web.app/";

  React.useEffect(() => {
    readBar();
  }, [readBar]);

  React.useEffect(() => {
    readPage_start();
  }, []);

  const back = () => {
    props.history.goBack();
  };

  const tanim = {
    animation: topAnimation,
  };
  const uanim = {
    animation: underAnimation,
  };
  const nowPageSumSrtyle = {
    top: topPosition,
    left: leftPosition,
  };

  const readPage_start = () => {
    setNowPageModal(false);
    mainWrapRef.current.scrollLeft =
      window.innerWidth * sliderBarRef.current.max;
  };

  const readPage_changePage = (e) => {
    const i = e.target.value;
    //PCの場合
    if (window.innerWidth > 1024) {
      const web_width = window.innerWidth * 0.7;
      mainWrapRef.current.scrollLeft = (web_width / 2) * i;
    }
    //タブレットの場合
    else if (window.innerWidth > 481) {
      const web_width = window.innerWidth * 0.9;
      mainWrapRef.current.scrollLeft = web_width * i;
    }
    //スマホの場合
    else {
      const web_width = window.innerWidth;
      mainWrapRef.current.scrollLeft = web_width * i;
    }
  };

  const scroll_handler = () => {
    if (0 === sliderBarRef.current.value) {
      setTopAnimation("top_out 0.2s linear forwards");
      setUnderAnimation("under_out 0.2s linear forwards");
    }
    //PCの場合
    if (window.innerWidth > 1024) {
      sliderBarRef.current.value =
        mainWrapRef.current.scrollLeft / ((window.innerWidth * 0.7) / 2);
      setPageNum(sliderBarRef.current.max - sliderBarRef.current.value + 1);
      if (mainWrapRef.current.scrollLeft === 0) {
        setPageNum("読了");
        setMaxPageModal(false);
        setTopPosition("65px");
        setLeftPosition("0");
        setTopAnimation("top_out 0.2s linear forwards");
        setUnderAnimation("under_out 0.2s linear forwards");
      } else {
        setMaxPageModal(true);
        setTopPosition("25px");
        setLeftPosition("-25px");
      }
    }
    //タブレットの場合
    else if (window.innerWidth > 481) {
      sliderBarRef.current.value =
        mainWrapRef.current.scrollLeft / (window.innerWidth * 0.9);
      setPageNum(
        sliderBarRef.current.max -
          Math.floor(
            (mainWrapRef.current.scrollLeft + (window.innerWidth * 0.9) / 2) /
              (window.innerWidth * 0.9) -
              1
          )
      );
      if (mainWrapRef.current.scrollLeft === 0) {
        setPageNum("読了");
        setMaxPageModal(false);
        setTopPosition("65px");
        setLeftPosition("0");
        setTopAnimation("top_out 0.2s linear forwards");
        setUnderAnimation("under_out 0.2s linear forwards");
      } else {
        setMaxPageModal(true);
        setTopPosition("30px");
        setLeftPosition("-35px");
      }
    }
    //スマホの場合
    else {
      sliderBarRef.current.value =
        mainWrapRef.current.scrollLeft / window.innerWidth;
      setPageNum(
        sliderBarRef.current.max -
          Math.floor(
            (mainWrapRef.current.scrollLeft + window.innerWidth / 2) /
              window.innerWidth -
              1
          )
      );

      if (mainWrapRef.current.scrollLeft === 0) {
        setPageNum("読了");
        setMaxPageModal(false);
        setTopPosition("50px");
        setLeftPosition("0");
        setTopAnimation("top_out 0.2s linear forwards");
        setUnderAnimation("under_out 0.2s linear forwards");
      } else {
        setMaxPageModal(true);
        setTopPosition("25px");
        setLeftPosition("-25px");
      }
    }
  };

  const on_mouse = () => {
    setNowPageModal(true);
  };

  const out_mouse = () => {
    setNowPageModal(false);
  };

  const change_page = (e) => {
    //PCの場合
    if (window.innerWidth > 1024) {
      if (e.pageX <= window.innerWidth * 0.15 + (window.innerWidth * 0.7) / 5) {
        if (0 === sliderBarRef.current.value - 1) {
          setTopAnimation('"top_out 0.2s linear forwards"');
          setUnderAnimation('"under_out 0.2s linear forwards"');
        }
        //次のページへ
        mainWrapRef.current.scrollLeft -= (window.innerWidth * 0.7) / 2;
        sliderBarRef.current.value =
          mainWrapRef.current.scrollLeft / ((window.innerWidth * 0.7) / 2) - 1;
      } else if (
        e.pageX >=
        window.innerWidth * 0.15 + ((window.innerWidth * 0.7) / 5) * 4
      ) {
        //前のページへ
        mainWrapRef.current.scrollLeft += (window.innerWidth * 0.7) / 2 + 100;
        sliderBarRef.current.value =
          mainWrapRef.current.scrollLeft / ((window.innerWidth * 0.7) / 2) + 1;
      } else {
        if (bar === true) {
          setTopAnimation("top_out 0.2s linear forwards");
          setUnderAnimation("under_out 0.2s linear forwards");
          setBar(false);
        } else {
          setTopAnimation("top_in 0.2s linear forwards");
          setUnderAnimation("under_in 0.2s linear forwards");
          setBar(true);
        }
      }
    }
    //タッブレットの場合
    if (window.innerWidth > 481) {
      if (e.pageX <= (window.innerWidth * 0.9) / 5) {
        if (0 === sliderBarRef.current.value - 1) {
          setTopAnimation('"top_out 0.2s linear forwards"');
          setUnderAnimation('"under_out 0.2s linear forwards"');
        }
        //次のページへ
        mainWrapRef.current.scrollLeft -= window.innerWidth * 0.9;
        sliderBarRef.current.value =
          mainWrapRef.current.scrollLeft / (window.innerWidth * 0.9);
      } else if (e.pageX >= ((window.innerWidth * 0.9) / 5) * 4) {
        //前のページへ
        mainWrapRef.current.scrollLeft += window.innerWidth * 0.9;
        sliderBarRef.current.value =
          mainWrapRef.current.scrollLeft / (window.innerWidth * 0.9) + 1;
      } else {
        if (bar === true) {
          setTopAnimation("top_out 0.2s linear forwards");
          setUnderAnimation("under_out 0.2s linear forwards");
          setBar(false);
        } else {
          setTopAnimation("top_in 0.2s linear forwards");
          setUnderAnimation("under_in 0.2s linear forwards");
          setBar(true);
        }
      }
    }

    //スマホの場合
    else {
      if (e.pageX <= window.innerWidth / 6) {
        if (0 === sliderBarRef.current.value - 1) {
          setTopAnimation('"top_out 0.2s linear forwards"');
          setUnderAnimation('"under_out 0.2s linear forwards"');
        }
        //次のページへ
        mainWrapRef.current.scrollLeft -= window.innerWidth;
        sliderBarRef.current.value =
          mainWrapRef.current.scrollLeft / window.innerWidth;
      } else if (e.pageX >= (window.innerWidth / 6) * 5) {
        //前のページへ
        mainWrapRef.current.scrollLeft += window.innerWidth;
        sliderBarRef.current.value =
          mainWrapRef.current.scrollLeft / window.innerWidth;
      } else {
        if (bar === true) {
          setTopAnimation("top_out 0.2s linear forwards");
          setUnderAnimation("under_out 0.2s linear forwards");
          setBar(false);
        } else {
          setTopAnimation("top_in 0.2s linear forwards");
          setUnderAnimation("under_in 0.2s linear forwards");
          setBar(true);
        }
      }
    }
  };
  return (
    <div className="read_container">
      {/* ヘッダー部分 */}
      <div className="manga_top_lavel" style={tanim}>
        <img src="/next.svg" alt="backButton" onClick={back} width="10" />
        <h1 className="read_title">Spring Works</h1>
      </div>

      {/* 漫画部分 */}
      <div
        className="manga_main_wrap"
        onScroll={scroll_handler}
        onClick={change_page}
        ref={mainWrapRef}
      >
        <div className="finish_page">
          <div className="share">
            <div className="twitter">
              <i className="fab fa-twitter"></i>
              <p>
                <a
                  href={shareTwitter}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Twitterでシェア
                </a>
              </p>
            </div>
            <div className="facebooook">
              <i className="fab fa-facebook"></i>
              <p>
                <a
                  href={shareFaceBook}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Facebookでシェア
                </a>
              </p>
            </div>
          </div>
        </div>
        {manga_src.map((value, i) => (
          <img src={value} alt="presentation" className="manga_main" key={i} />
        ))}
      </div>

      {/* ページ数表示 */}
      {nowPageModal && (
        <div className="now_manga_page">
          <div className="page_circle">
            <div className="now_manga_page_sum" style={nowPageSumSrtyle}>
              {pageNum}
            </div>
            {maxPageModal && (
              <React.Fragment>
                <div className="slash"></div>
                <div className="max_manga_page_sum">{manga_src.length}</div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}

      {/* フッター部分 */}
      <div className="manga_under_lavel" style={uanim}>
        <p className="slide_bar_wrap">
          <input
            type="range"
            min="0"
            max={manga_src.length}
            step="1"
            onChange={readPage_changePage}
            onTouchStart={on_mouse}
            onMouseDown={on_mouse}
            onTouchEnd={out_mouse}
            onMouseOut={out_mouse}
            ref={sliderBarRef}
          ></input>
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  readBar: () => dispatch(readBar()),
});

export default connect(null, mapDispatchToProps)(Read);
