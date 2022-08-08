import React from "react";
import emoji from "react-easy-emoji";

function svgEmoji(input) {
  return emoji(input, {
    baseUrl: "https://twemoji.maxcdn.com/2/svg/",
    ext: ".svg",
    size: "",
    props: { style: { height: "100%", width: "100%" } },
  });
}

const emojiContainerStyles = {
  height: "20em",
  width: "20em",
};

const EmojiDisplay = (product) => {
  let displayEmoji = svgEmoji(product.desc || "");

  return <div style={emojiContainerStyles}>{displayEmoji}</div>;
};

export default EmojiDisplay;
