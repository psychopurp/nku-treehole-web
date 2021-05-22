import React, { useState } from "react";
import { Snackbar, SnackbarProps, DialogProps } from "@material-ui/core";
import ReactDOM from "react-dom";

class DomController {
  static appendChild(child: React.ReactElement): HTMLElement {
    let div: HTMLElement = document.createElement("div");
    document.body.appendChild(div);
    ReactDOM.render(child, div);
    return div;
  }

  static removeChild(node: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  }
}

type Closer = () => void;
type ClosableElement = (closer: Closer) => React.ReactElement;

interface NoticeService {
  showSnackBar(element: ClosableElement): void;
  showDialog(element: ClosableElement): void;
}

const noticeService: NoticeService = {
  showSnackBar(element: ClosableElement) {
    let n = DomController.appendChild(
      element(() => {
        DomController.removeChild(n);
      })
    );
  },

  showDialog(element: ClosableElement) {},
};

export default noticeService;

interface NoticeServiceOptions {
  type: "SnackBar" | "Dialog";
  snackBarOptions?: SnackbarProps;
  dialogOptions?: DialogProps;
}

const NoticeServiceContext = React.createContext<
  (options: NoticeServiceOptions) => Promise<void>
>(Promise.reject);

export const useNoticeService = () => React.useContext(NoticeServiceContext);

export const NoticeServiceProvider: React.FC = ({ children }) => {
  const [noticeState, setNoticeState] =
    useState<NoticeServiceOptions | null>(null);

  const awaitingPromiseRef =
    React.useRef<{
      resolve: () => void;
      reject: () => void;
    }>();

  const runContext = (options: NoticeServiceOptions) => {
    setNoticeState(options);
    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  function closeSnackBar(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }
    setNoticeState(null);
  }

  return (
    <>
      <NoticeServiceContext.Provider value={runContext} children={children} />

      <Snackbar
        open={noticeState?.type === "SnackBar"}
        onClose={closeSnackBar}
        {...noticeState?.snackBarOptions}
      ></Snackbar>
    </>
  );
};
