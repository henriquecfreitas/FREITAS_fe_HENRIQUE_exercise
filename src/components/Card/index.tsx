import * as React from 'react';
import {useNavigate} from 'react-router-dom';

import {Teams, UserData} from '@Types';

import {Container} from './styles';

interface Column {
    key: string;
    value: string;    
}

interface Props {
    id?: string;
    url?: string;
    columns: Column[];
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
}

const Card: React.FC<Props> = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Container
            data-testid={`cardContainer-${id}`}
            hasNavigation={hasNavigation}
            onClick={(e: Event) => {
                if (hasNavigation) {
                    navigate(url, {
                        state: navigationProps,
                    });
                }
                e.preventDefault();
            }}
        >
            {columns.map(({key: columnKey, value}) => (
                <p key={columnKey}>
                    <strong>{columnKey}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
