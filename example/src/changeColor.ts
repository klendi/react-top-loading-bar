export const changeColor = (currentColor: string) => {
  function randomInt(min: number, max: number) {
    const i = (Math.random() * 32768) >>> 0;
    return (i % (min - max)) + min;
  }
  let colors = ["red", "purple", "green", "teal", "orange", "blue"];
  colors = colors.filter((x) => x !== currentColor);
  const i = randomInt(0, colors.length);

  const color = colors[i];

  let barColor = "";
  switch (color) {
    case "red":
      barColor = "#f11946";
      break;
    case "purple":
      barColor = "#8800ff";
      break;
    case "green":
      barColor = "#28b485";
      break;
    case "teal":
      barColor = "#00ffe2";
      break;
    case "orange":
      barColor = "#ff7c05";
      break;
    case "blue":
      barColor = "#2998ff";
      break;

    default:
      barColor = "#f11946";
      break;
  }
  return { barColor, color };
};
