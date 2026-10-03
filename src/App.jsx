import Controls from "./components/Controls";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <Main />
      <Controls />
    </div>
  );
};

export default App;
