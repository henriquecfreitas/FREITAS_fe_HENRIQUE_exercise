import React from "react"

import {PageState, Teams} from '@Types';

interface AppState {
  isLoading: boolean,
  pageData: PageState,
  teams: Teams[],
}

export default React.createContext<AppState>(null)
