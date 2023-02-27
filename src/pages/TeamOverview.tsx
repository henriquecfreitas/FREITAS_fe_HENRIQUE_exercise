import * as React from 'react';
import {useLocation} from 'react-router-dom';

import {ListItem, UserData} from '@Types';
import {AppContext} from '@Context';

import {Card, Container, Header, List, Spinner} from '@Components';

var mapUsers = (users: UserData[]) => users.map(user => {
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
}) as ListItem[];

var teamLeadCols = (teamLead: UserData) => [
    {
        key: 'Team Lead',
        value: '',
    },
    {
        key: 'Name',
        value: `${teamLead.firstName} ${teamLead.lastName}`,
    },
    {
        key: 'Display Name',
        value: teamLead.displayName,
    },
    {
        key: 'Location',
        value: teamLead.location,
    },
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
                columns={teamLeadCols(teamLead)}
                url={`/user/${teamLead.id}`}
                navigationProps={teamLead}
            />}
            {isLoading ? <Spinner /> : <List items={mapUsers(teamMembers)} />}
        </Container>
    );
};

export default TeamOverview;
