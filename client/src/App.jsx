import ChatWindow from "./components/ChatWindow";
import RelaxingPanel from "./components/RelaxingPanel";
import "./App.css";

function App() {
  return (
    <div className="flex h-dvh w-full bg-slate-50 overflow-hidden">
      {/* Chat Area - Full on mobile, 1/3 on desktop */}
      <div className="w-full md:w-1/3 h-full flex flex-col border-r border-slate-200 shadow-xl z-20">
        <ChatWindow />
      </div>

      {/* Relaxing Panel - Hidden on mobile, 2/3 on desktop */}
      <RelaxingPanel />
    </div>
  );
}

export default App;
