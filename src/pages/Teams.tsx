import * as React from 'react';

import {ListItem, Teams as TeamsList} from '@Types';
import {getTeams as fetchTeams} from '@API';

import Header from '@Components/Header';
import List from '@Components/List';
import {Container} from '@Components/GlobalComponents';


var MapT = (teams: TeamsList[]) => {
    return teams.map(team => {
        var columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<any>(true);

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={MapT(teams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
