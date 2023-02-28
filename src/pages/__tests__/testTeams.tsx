import * as React from 'react';
import {render, screen} from '@testing-library/react';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    let useContextSpy;
    beforeEach(() => {
        useContextSpy = jest.spyOn(React, "useContext");
    });

    it('should render header and don\'t render items on empty list', async () => {
        useContextSpy.mockReturnValue({teams: []});
        render(<Teams />);

        expect(screen.getByTestId('headerContainer')).toBeInTheDocument();
        await expect(
            screen.findAllByTestId(/cardContainer/)
        ).rejects.toBeTruthy();
    });

    it('should render teams list', async () => {
        useContextSpy.mockReturnValue({teams: [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]});

        render(<Teams />);

        await expect(
            screen.findAllByTestId(/cardContainer/)
        ).resolves.toHaveLength(2);
    });
});
