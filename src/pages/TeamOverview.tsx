import * as React from 'react';
import {useLocation} from 'react-router-dom';

import {ListItem, UserData} from '@Types';
import {AppContext} from '@Context';

import Card from '@Components/Card';
import {Container} from '@Components/GlobalComponents';
import Header from '@Components/Header';
import List from '@Components/List';

var mapArray = (users: UserData[]) => {
    return users.map(u => {
        var columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    }) as ListItem[];
};

var mapTeamLead = (teamLead: UserData) => {
    var columns = [
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
    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} />;
};

const TeamOverview: React.FC = () => {
    const {state: {name}} = useLocation();

    const {pageData, isLoading} = React.useContext(AppContext);

    return (
        <Container>
            <Header title={`Team ${name}`} />
            {!isLoading && mapTeamLead(pageData.teamLead)}
            <List items={mapArray(pageData?.teamMembers ?? [])} />
        </Container>
    );
};

export default TeamOverview;
