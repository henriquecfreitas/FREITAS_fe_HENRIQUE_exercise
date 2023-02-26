import React, {PropsWithChildren, useState} from 'react';
import {useParams} from 'react-router-dom';

import {
  getTeamOverview,
  getUserData,
  getTeams as fetchTeams,
} from '@API';

import AppContext from './AppContext';

const AppContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {teamId} = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({});
  const [teams, setTeams] = useState([]);

  React.useEffect(() => {
    let isAborted = false;

    setIsLoading(true);
    (async () => {
        const _teams = await fetchTeams();
        if (isAborted) {return;}

        setTeams(_teams);
    })().then(() => {
      setIsLoading(false);
    });

    return () => {
      isAborted = true;
    };
  }, []);

  React.useEffect(() => {
      let isAborted = false;

      setIsLoading(true);
      (async () => {
          const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
          if (isAborted) {return;}

          const teamLead = await getUserData(teamLeadId);
          if (isAborted) {return;}

          const teamMembers = [];
          for(var teamMemberId of teamMemberIds) {
              const data = await getUserData(teamMemberId);
              teamMembers.push(data);
          }
          if (isAborted) {return;}

          setPageData({
              teamLead,
              teamMembers,
          });
      })().then(() => {
        setIsLoading(false);
      });

      return () => {
        isAborted = true;
      };
  }, [teamId]);

  return <AppContext.Provider value={{
    isLoading,
    pageData,
    teams,
  }}>
    {children}
  </AppContext.Provider>;
};

export default AppContextProvider;
