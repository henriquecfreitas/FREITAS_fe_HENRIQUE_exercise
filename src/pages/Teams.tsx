import * as React from 'react';

import {ListItem, Teams as TeamsList} from '@Types';

import { AppContext } from '@Context';

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
    const {teams} = React.useContext(AppContext)

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <List items={MapT(teams)} />
        </Container>
    );
};

export default Teams;
