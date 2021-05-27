import Appbar from "../../components/AppBar";
import styles from "./index.module.less";
import { useEffect, useRef, useState, CSSProperties } from "react";
import { BScrollConstructor } from "@better-scroll/core/dist/types/BScroll";
import Scroll from "../../components/Scroll";
import { apiGetPosts } from "../../api/postService";
import { useRequest } from "ahooks";

export interface HomeProps {}

const Home: React.FC = () => {
  const [text, setText] = useState(0);
  const [state, setstate] = useState<any[]>([]);
  const emojis = [
    "😀 😁 😂 🤣 😃",
    "😄 😅 😆 😉 😊",
    "😫 😴 😌 😛 😜",
    "👆🏻 😒 😓 😔 👇🏻",
    "😑 😶 🙄 😏 😣",
    "😞 😟 😤 😢 😭",
    "🤑 😲 🙄 🙁 😖",
    "👍 👎 👊 ✊ 🤛",
    "🙄 ✋ 🤚 🖐 🖖",
    "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
    "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
    "🌖 🌗 🌘 🌑 🌒",
    "💫 💥 💢 💦 💧",
    "🐠 🐟 🐬 🐳 🐋",
    "😬 😐 😕 😯 😶",
    "😇 😏 😑 😓 😵",
    "🐥 🐣 🐔 🐛 🐤",
    "💪 ✨ 🔔 ✊ ✋",
    "👇 👊 👍 👈 👆",
    "💛 👐 👎 👌 💘",
    "👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼",
    "☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽",
    "🌖 🌗 🌘 🌑 🌒",
    "💫 💥 💢 💦 💧",
    "🐠 🐟 🐬 🐳 🐋",
    "😬 😐 😕 😯 😶",
    "😇 😏 😑 😓 😵",
    "🐥 🐣 🐔 🐛 🐤",
    "💪 ✨ 🔔 ✊ ✋",
    "👇 👊 👍 👈 👆",
    "💛 👐 👎 👌 💘",
  ];

  return (
    <div>
      <Appbar />

      <Scroll wrapHeight="93vh" onPullup={() => {}} onPulldown={() => {}}>
        {emojis.map((item, idx) => (
          <div key={idx} style={{ height: "200px", background: "green" }}>
            {item}
          </div>
        ))}
      </Scroll>
    </div>
  );
};

export default Home;
