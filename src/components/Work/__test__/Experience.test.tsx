import { render, screen } from '@testing-library/react';

import Experience from '../Experience';

const endDate = new Date('2011-01-01');
const startDate = new Date('2010-01-01');

const baseProps = {
  current: false,
  endDate,
  logo: {
    url: 'logo.svg',
  },
  startDate,
  title: 'Employer',
  workedOn: 'Employ Description',
};

describe('<Experience />', () => {
  test('should show only start date on current experience', () => {
    const props = {
      ...baseProps,
      current: true,
    };

    render(<Experience {...props} />);

    const body = document.querySelector('.column').innerHTML;

    expect(body).toMatchInlineSnapshot(
      `"<time datetime=\\"2010-01-01T00:00:00.000Z\\">Jan 2010</time> "`
    );
  });

  test('should show start and end date on past experience', () => {
    const props = baseProps;

    render(<Experience {...props} />);

    const body = document.querySelector('.column').innerHTML;

    expect(body).toMatchInlineSnapshot(
      `"<time datetime=\\"2010-01-01T00:00:00.000Z\\">Jan 2010</time> — <time datetime=\\"2011-01-01T00:00:00.000Z\\">Jan 2011</time>"`
    );
  });

  test('should the correct logo', () => {
    render(<Experience {...baseProps} />);

    const body = document.querySelector('.column:nth-child(2)').innerHTML;

    expect(body).toMatchInlineSnapshot(
      `"<img src=\\"logo.svg\\" title=\\"Employer\\">"`
    );
  });
});
