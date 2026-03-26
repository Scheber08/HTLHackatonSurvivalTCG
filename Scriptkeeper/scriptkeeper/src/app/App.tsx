import { useRunStore } from "../store/useRunStore";
import { HomeScreen } from "../ui/screens/HomeScreen";
import { RunScreen } from "../ui/screens/RunScreen";

function App() {
  const run = useRunStore((state) => state.run);

  return run ? <RunScreen /> : <HomeScreen />;
}

export default App;