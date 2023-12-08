import { createContext } from 'react'
import { ScreenResolution } from './constants';

export interface AppContext {
  screenResolution: ScreenResolution.Small | ScreenResolution.Large | 'others';
}

export const AppContext = createContext<AppContext>({
  screenResolution: ScreenResolution.Small,
})