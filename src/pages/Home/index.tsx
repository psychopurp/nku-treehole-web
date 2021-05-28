import Appbar from "../../components/AppBar";
import styles from "./index.module.less";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll";
import Scroll from "../../components/Scroll";
import { apiGetPosts, Post } from "../../api/postService";
import { useRequest } from "ahooks";
import { useNoticeService } from "../../components/NoticeService";
import { PageQueryParams } from "../../types";
import CustomSnackBar from "../../components/CustomSnackBar";
import { Avatar, Divider, Typography } from "@material-ui/core";

export interface HomeProps {}

const Home: React.FC = () => {
  const [dataList, setDataList] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const notice = useNoticeService();

  const { run, loading } = useRequest(apiGetPosts, {
    manual: true,
    onSuccess: ({ data }, params: [param: PageQueryParams]) => {
      setDataList(dataList.concat(data.list));

      if (page + 1 < data.total) {
        setPage(page + 1);
      }
      console.log(data, params, page, dataList);
    },
    onError: (error) => {
      console.log(error);
      notice({
        type: "SnackBar",
        snackBarOptions: { ...CustomSnackBar(error.message, false) },
      });
    },
  });

  useEffect(() => {
    run({ page: page, limit: 20 });
  }, [page, run]);

  return (
    <div className={styles.root}>
      <Appbar title="首页" />

      <div className={styles.main}>
        <Scroll wrapHeight="92vh" onPullup={() => {}} onPulldown={() => {}}>
          {dataList.map((item, idx) => (
            <div key={idx}>
              <PostItem {...item} />
            </div>
          ))}
        </Scroll>
      </div>
    </div>
  );
};

export default Home;

const PostItem: React.FC<Post> = (item) => {
  return (
    <div className={styles.postItem}>
      <div className={styles.row}>
        <Avatar alt="Avatar" src={item.avatar} className={styles.avatar} />
        <Typography variant="subtitle2">{item.userName}</Typography>
      </div>

      <Typography>{item.content}</Typography>
      <Divider />
    </div>
  );
};
