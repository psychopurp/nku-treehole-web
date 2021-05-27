import React, { useRef, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Icon,
  TextareaAutosize,
  TextField,
  InputBase,
  Divider,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./index.module.less";
import { useHistory } from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import { apiCreatePost, CreatePostData } from "../../api/postService";
import { useRequest } from "ahooks";
import { useNoticeService } from "../../components/NoticeService";
import CustomSnackBar from "../../components/CustomSnackBar";

export interface PostProps {}

const Post: React.FC<PostProps> = () => {
  const history = useHistory();
  const [content, setContent] = useState<string>("");
  const notice = useNoticeService();

  const { run, loading } = useRequest(apiCreatePost, {
    manual: true,
    onSuccess: ({ data }, params: [data: CreatePostData]) => {
      console.log(data, params);
      notice({
        type: "SnackBar",
        snackBarOptions: CustomSnackBar(),
      });

      history.replace("/index/home");
    },
    onError: (error) => {
      console.log(error);
      notice({
        type: "SnackBar",
        snackBarOptions: { ...CustomSnackBar(error.message, false) },
      });
    },
  });

  function onSend() {
    run({ content: content });
  }

  return (
    <div className={styles.root}>
      <Backdrop open={loading} className={styles.backDrop}>
        <CircularProgress />
      </Backdrop>
      <AppBar position="static">
        <Toolbar className={styles.bar}>
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            Cancel
          </Button>

          <Typography className={styles.title} variant="subtitle1">
            发树洞
          </Typography>

          <Button
            onClick={onSend}
            size="small"
            variant="contained"
            className={styles.send}
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </Toolbar>
      </AppBar>
      <InputBase
        className={styles.input}
        id="filled-multiline-flexible"
        multiline
        rows={8}
        placeholder="想说点什么 ?"
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <Divider />
      <Typography className={styles.text} variant="subtitle2">
        {content.length}
      </Typography>
    </div>
  );
};

export default Post;
