import * as React from 'react';
import {useNavigate} from 'react-router-dom';

import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

interface Props {
    title: string;
    showBackButton?: boolean;
}

const Header: React.FC<Props> = ({
    title,
    showBackButton = true,
}) => {
    const navigate = useNavigate();
    return (
        <HeaderContainer data-testid="headerContainer">
            <NavigationHeader>
                {showBackButton && (
                    <BackButton
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        🔙
                    </BackButton>
                )}
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
