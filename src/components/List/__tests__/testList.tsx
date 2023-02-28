import * as React from 'react';
import {render, screen} from '@testing-library/react';
import List from '..';

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => jest.fn(),
}));

describe('List', () => {
    let useContextSpy;
    beforeEach(() => {
        useContextSpy = jest.spyOn(React, "useContext");
    });

    it('should render spinner and not render items when it is loading', () => {
        useContextSpy.mockReturnValue({isLoading: true});
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List items={items} />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
        expect(screen.queryByTestId('cardContainer')).not.toBeInTheDocument();
    });

    it('should not render spinner and render items when it is not loading', () => {
        useContextSpy.mockReturnValue({isLoading: false});
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
        ];
        render(<List items={items} />);

        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
    });

    it('should render multiple card when multiple items', () => {
        useContextSpy.mockReturnValue({isLoading: false});
        const items = [
            {
                id: '1',
                columns: [
                    {
                        key: 'columnKey1',
                        value: 'columnValue1',
                    },
                ],
            },
            {
                id: '2',
                columns: [
                    {
                        key: 'columnKey2',
                        value: 'columnValue2',
                    },
                ],
            },
        ];
        render(<List items={items} />);

        expect(screen.getByTestId('cardContainer-1')).toBeInTheDocument();
        expect(screen.getByTestId('cardContainer-2')).toBeInTheDocument();
    });
});
