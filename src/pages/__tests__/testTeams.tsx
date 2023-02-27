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

    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        // TODO - Add code for this test
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

        expect(screen.getByText('Team1')).toBeInTheDocument();
        expect(screen.getByText('Team2')).toBeInTheDocument();
    });
});
