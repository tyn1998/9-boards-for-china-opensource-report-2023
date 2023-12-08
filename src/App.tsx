import { AppContext } from './AppContext'
import { ScreenResolution } from './constants'
import { Boards } from './Boards'

import './App.css'

function App() {
  const screenResolution: AppContext['screenResolution'] = ScreenResolution.Large;

  return (
    <AppContext.Provider value={{ screenResolution }}>
      <Boards />
    </AppContext.Provider>
  )
}

export default App
