import * as React from 'react';
import {useLocation} from 'react-router-dom';

import {UserData} from '@Types';

import {Card, Container, Header} from '@Components';

var cardColumns = (user: UserData) => [
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

const UserOverview: React.FC = () => {
    const {state: user} = useLocation();
    const columns = cardColumns(user);

    return (
        <Container>
            <Header
                title={`User ${user.firstName} ${user.lastName}`}
            />
            <Card columns={columns} hasNavigation={false} navigationProps={user} />
        </Container>
    );
};

export default UserOverview;
