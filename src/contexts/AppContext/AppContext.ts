import React from 'react';

import {TeamPageData, Teams} from '@Types';

interface AppState {
  isLoading: boolean,
  teamPageData: TeamPageData,
  teams: Teams[],
}

export default React.createContext<AppState>(null);
