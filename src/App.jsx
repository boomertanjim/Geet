import Controls from "./components/Controls";
import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

const App = () => {
  const [current, setCurrent] = useState(0);
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header current={current} setCurrent={setCurrent} />
      <Main current={current} />
      <Controls />
    </div>
  );
};

export default App;
