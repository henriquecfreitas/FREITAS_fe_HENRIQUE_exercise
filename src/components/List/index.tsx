import * as React from 'react';
import {ListItem} from '@Types';

import { AppContext } from '@Context';

import Card from '@Components/Card';
import {Spinner} from '@Components/Spinner';

import {Container} from './styles';

interface Props {
    items?: ListItem[];
    hasNavigation?: boolean;
}

const List: React.FC<Props> = ({
    items,
    hasNavigation = true
}) => {
    const {isLoading} = React.useContext(AppContext)

    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                        />
                    );
                })}
        </Container>
    );
};

export default List;
