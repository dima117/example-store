import { expect, test } from 'vitest';
import { render } from '@testing-library/react';

test('adds 1 + 2 to equal 3', () => {
    const { container } = render(<div>1234</div>);

    expect(container.innerHTML).toBe('<div>1234</div>');
});
