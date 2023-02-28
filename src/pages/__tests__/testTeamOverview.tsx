import * as React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import TeamOverview from '../TeamOverview';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            name: 'Some Team',
        },
    }),
    useNavigate: () => ({}),
    useParams: () => ({
        teamId: '1',
    }),
}));

describe('TeamOverview', () => {
    let useContextSpy;
    beforeEach(() => {
        useContextSpy = jest.spyOn(React, "useContext");
    });

    it('should render header and don\'t render items on empty list', async () => {
        useContextSpy.mockReturnValue({teamPageData: {
            teamMembers: [],
        }});
        render(<TeamOverview />);

        expect(screen.getByTestId('headerContainer')).toBeInTheDocument();
        expect(screen.getByText('Team Some Team')).toBeInTheDocument();

        await expect(
            screen.findAllByTestId(/cardContainer/)
        ).rejects.toBeTruthy();
    });

    it('should render team lead', async () => {
        const teamLead = {
            id: '2',
            firstName: 'John',
            lastName: 'Smith',
            displayName: 'userData',
            location: '',
            avatar: '',
        };

        useContextSpy.mockReturnValue({
            isLoading: false,
            teamPageData: {
                teamLead,
                teamMembers: [],
            },
        });

        render(<TeamOverview />);

        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
        expect(screen.getByText('John Smith')).toBeInTheDocument();
    });

    it('should render team overview users', async () => {

        const teamMembers = ['3', '4', '5'].map(id => ({
            id,
            firstName: 'userData',
            lastName: 'userData',
            displayName: 'userData',
            location: '',
            avatar: '',
        }));

        useContextSpy.mockReturnValue({
            isLoading: false,
            teamPageData: {
                teamMembers,
            },
        });

        render(<TeamOverview />);

        await waitFor(() => {
            expect(screen.queryAllByText('userData')).toHaveLength(3);
        });
    });
});
