// export components
// export {default as TuoComPonents} from './components/TuoComPonents';

import { useTuoToast } from "./contexts/TuoToastContext"

const App = () => {
  const {showToast} = useTuoToast();
  return (
    <div style={{cursor: "pointer"}} onClick={() => showToast('test')}>App</div>
  )
}

export default App;