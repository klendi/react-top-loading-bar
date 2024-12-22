import { LoadingBarContainer, useLoadingBar } from "react-top-loading-bar";

const App = () => {
  const { start, complete, decrease, increase } = useLoadingBar({
    height: 3,
  });

  return (
    <div>
      <br />
      <button onClick={() => start()}>Start animated loading bar</button>
      <button onClick={() => start("static")}>Start static loading bar</button>
      <button onClick={() => decrease(30)}>dec</button>
      <button onClick={() => increase(30)}>dec</button>

      <button onClick={() => complete()}>Complete</button>
    </div>
  );
};

const Parent = () => {
  return (
    <LoadingBarContainer
      props={{
        color: "blue",
      }}
    >
      <App />
    </LoadingBarContainer>
  );
};

export default Parent;
