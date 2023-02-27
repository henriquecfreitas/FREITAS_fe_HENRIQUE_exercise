import * as React from 'react';
import {useLocation} from 'react-router-dom';

import {ListItem, UserData} from '@Types';
import {AppContext} from '@Context';

import {Card, Container, Header, List, Spinner} from '@Components';

var mapUser = (user: UserData): ListItem => {
    var columns = [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
    return {
        id: user.id,
        url: `/user/${user.id}`,
        columns,
        navigationProps: user,
    };
};

var teamLeadCols = (teamLead: UserData) => [
    {
        key: 'Team Lead',
        value: '',
    },
    ...(mapUser(teamLead).columns),
];

const TeamOverview: React.FC = () => {
    const {state: {name}} = useLocation();

    const {
        teamPageData: {teamLead, teamMembers},
        isLoading,
    } = React.useContext(AppContext);

    return (
        <Container>
            <Header title={`Team ${name}`} />
            {teamLead && <Card
                {...mapUser(teamLead)}
                columns={teamLeadCols(teamLead)}
            />}
            {isLoading ? <Spinner /> : <List items={teamMembers.map(mapUser)} />}
        </Container>
    );
};

export default TeamOverview;
