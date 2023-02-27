import React, {PropsWithChildren, useState} from 'react';
import {useParams} from 'react-router-dom';

import {
  getTeamOverview,
  getUserData,
  getTeams as fetchTeams,
} from '@API';
import {UserData, Teams} from '@Types';

import AppContext from './AppContext';

const AppContextProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {teamId} = useParams();

  const [currentTeamId, setCurrentTeamId] = useState<string>(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const [teamLead, setTeamLead] = useState<UserData>(undefined);
  const [teamMembers, setTeamMembers] = useState<UserData[]>([]);
  const [teams, setTeams] = useState<Teams[]>([]);

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
      if (!teamId || teamId === currentTeamId) {return () => {};}

      setTeamLead(undefined);
      setTeamMembers([]);

      let isAborted = false;

      setIsLoading(true);
      (async () => {
          const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
          if (isAborted) {return;}

          await Promise.all([
            (async () => {
              const _teamLead = await getUserData(teamLeadId);
              if (isAborted) {return;}
              setTeamLead(_teamLead);
            })(),
            (async () => {
              const _teamMembers = await Promise.all(
                teamMemberIds.map(getUserData)
              );
              if (isAborted) {return;}
              setTeamMembers(_teamMembers);
            })(),
          ]);
      })().then(() => {
        setIsLoading(false);
        setCurrentTeamId(teamId);
      });

      return () => {
        isAborted = true;
      };
  }, [teamId]);

  return <AppContext.Provider value={{
    isLoading,
    teamPageData: {
      teamLead,
      teamMembers,
    },
    teams,
  }}>
    {children}
  </AppContext.Provider>;
};

export default AppContextProvider;
