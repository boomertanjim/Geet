import Home from "./Home";

const Main = () => {
  return (
    <div className="flex-1 overflow-y-auto grid grid-cols-8">
      <div className="col-span-2 bg-bg200 rounded-tr-2xl p-2">
        <h1>Current Queue</h1>
      </div>
      <div className="col-span-6">
        <Home />
      </div>
    </div>
  );
};

export default Main;
