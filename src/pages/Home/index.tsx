import Appbar from "../../components/AppBar";
import styles from "./index.module.less";
import { useEffect, useRef, useState } from "react";
import { apiGetPosts, Post } from "../../api/postService";
import { useRequest } from "ahooks";
import { useNoticeService } from "../../components/NoticeService";
import { PageQueryParams } from "../../types";
import CustomSnackBar from "../../components/CustomSnackBar";
import { Avatar, Divider, Typography } from "@material-ui/core";
import { Utils } from "../../utils/func";

import Scroll from "react-scroll-mobile";

export interface HomeProps {}

const Home: React.FC = () => {
  const [dataList, setDataList] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [noMore, setNoMore] = useState<boolean>(false);
  const notice = useNoticeService();

  const { run, loading } = useRequest(apiGetPosts, {
    manual: true,
    onSuccess: ({ data }, params: [param: PageQueryParams]) => {
      setDataList(dataList.concat(data.list));

      if (page + 1 < data.total) {
        setPage(page + 1);
      } else {
        setNoMore(true);
        console.log("set nomore");
      }
      // console.log(data, params, page, dataList);
    },
    onError: (error) => {
      console.log(error);
      notice({
        type: "SnackBar",
        snackBarOptions: { ...CustomSnackBar(error.message, false) },
      });
    },
  });

  const onPullup = async () => {
    console.log("onpullup");
    // setPage(1);
    // await Utils.Sleep(5000);
    // await run({ page: page, limit: 20 });
  };
  const onPullDown = async () => {
    console.log("pulldown");
    setPage(0);
    await run({ page: page, limit: 20 });
    // await Utils.Sleep(5000);
  };

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("using effect");
    run({ page: page, limit: 20 });
  }, [page, run]);

  return (
    <div className={styles.root}>
      <Appbar title="首页" className={styles.appBar} />

      <div className={styles.main}>
        <Scroll
          ref={wrapRef}
          pullDownRefresh={onPullDown}
          pullUpLoad={onPullup}
          noMore={noMore}
          // backTop
        >
          {dataList.map((item, idx) => (
            <div key={idx}>
              <PostItem {...item} />
            </div>
          ))}
        </Scroll>

        {/* <Scroll
          wrapHeight="84vh"
          onPullup={onPullup}
          onPulldown={handlePullDown}
        >
          {dataList.map((item, idx) => (
            <div key={idx}>
              <PostItem {...item} />
            </div>
          ))}
        </Scroll> */}
      </div>
    </div>
  );
};

export default Home;

const PostItem: React.FC<Post> = (item) => {
  return (
    <div className={styles.postItem}>
      <div className={styles.row}>
        {item.avatar === "" ? (
          <Avatar alt="Avatar" className={styles.avatar}>
            {item.username.slice(0, 2)}
          </Avatar>
        ) : (
          <Avatar alt="Avatar" src={item.avatar} className={styles.avatar} />
        )}

        <div className={styles.column}>
          <Typography style={{ fontWeight: "bold" }} variant="subtitle2">
            {item.username}
          </Typography>
          <Typography
            style={{ color: "grey", fontWeight: "lighter" }}
            variant="caption"
            display="block"
            gutterBottom
          >
            {item.createdAt.slice(0, 19)}
          </Typography>
        </div>
      </div>

      <Typography className={styles.content}>{item.content}</Typography>
      <Divider variant="fullWidth" />
    </div>
  );
};
