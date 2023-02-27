import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import {Teams} from '@Types';
import Card from '..';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Card', () => {
    it('should render card with single column', () => {
        var columns = [{key: 'columnKey', value: 'columnValue'}];
        render(<Card columns={columns} />);

        expect(screen.getByText('columnKey')).toBeInTheDocument();
        expect(screen.getByText('columnValue')).toBeInTheDocument();

        expect(screen.getByTestId('cardContainer').childNodes).toHaveLength(1);
    });

    it('should render card with multiple columns', () => {
        var columns = [
            {key: 'columnKey1', value: ''},
            {key: 'columnKey2', value: ''},
            {key: 'columnKey3', value: ''},
            {key: 'columnKey4', value: ''},
        ];
        render(<Card columns={columns} />);

        expect(screen.getByTestId('cardContainer').childNodes).toHaveLength(4);
    });

    it('should navigate when card is clicked and navigation is enabled', () => {
        const navProps = {
            id: '1',
            name: 'Team 1',
        } as Teams;
        render(
            <Card
                columns={[{key: 'columnKey', value: 'columnValue'}]}
                url="path"
                navigationProps={navProps}
            />
        );

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).toHaveBeenCalledWith('path', {state: navProps});
    });

    it('should not navigate when card is clicked and navigation is disabled', () => {
        render(<Card columns={[{key: 'columnKey', value: 'columnValue'}]} hasNavigation={false} />);

        fireEvent.click(screen.getByText('columnKey'));

        expect(mockUseNavigate).not.toHaveBeenCalled();
    });
});
