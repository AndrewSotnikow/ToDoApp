// npx jest -i atoms/CheckBox/test.ts
import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { sleep } from '#libraries/async/sleep';
import { Checkbox } from './index';

const glob = global as any;

describe('CheckBox test', () => {
  let container: HTMLDivElement;

  const getMockFn = (): any => {
    const mockFn = () => {
      // eslint-disable-next-line no-plusplus
      mockFn.countCalls++;
    };
    mockFn.countCalls = 0;
    return mockFn;
  };

  const clearDocument = () => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  };

  beforeEach(() => {
    clearDocument();
  });

  test('render CheckBox', async () => {
    const getElement = () => (
      <Checkbox
        native={{
          'aria-label': 'checkbox',
        }}
      />
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );

    await sleep(0.1);

    const CheckBox = screen.getByRole('checkbox', { name: 'checkbox' }) as HTMLInputElement;
    expect(CheckBox).toBeInTheDocument();
  });

  test('should fire onChange test', async () => {
    const onChange = getMockFn();

    const getElement = () => (
      <Checkbox
        native={{
          'aria-label': 'checkbox2',
          onChange,
        }}
      />
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );

    await sleep(0.1);

    const CheckBox = screen.getByRole('checkbox', { name: 'checkbox2' });
    expect(CheckBox).toBeInTheDocument();

    fireEvent.click(CheckBox);
    await sleep(0.1);

    expect(onChange.countCalls).toBeGreaterThan(0);
  });

  test('should disable CheckBox test', async () => {
    const onChange = getMockFn();

    const getElement = () => (
      <Checkbox
        checkedIcon= 'checkedIcon'
        uncheckedIcon= 'uncheckedIcon'
        native={{
          'aria-label': 'checkbox2',
          onChange,
          disabled: true,
        }}
      />
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );

    await sleep(0.1);

    const CheckBox = screen.getByRole('checkbox', { name: 'checkbox2' }) as HTMLInputElement;

    expect(onChange.countCalls).toEqual(0);

    fireEvent.change(CheckBox);
    await sleep(0.3);

    expect(onChange.countCalls).toEqual(0);
  });

  test('should render custom icons', async () => {
    const onChange = getMockFn();

    const getElement = () => (
      <Checkbox
        checkedIcon='checkedIcon'
        uncheckedIcon='uncheckedIcon'
        native={{
          'aria-label': 'checkbox2',
          onChange,
        }}
      />
    );

    render(
      getElement(),
      {
        hydrate: true,
        container: glob.runInServerEnv(
          () => {
            container.innerHTML = renderToString(getElement());
            return container;
          },
        ),
      },
    );

    await sleep(0.3);
    const CheckBox = screen.getByRole('checkbox', { name: 'checkbox2' });

    const uncheckedIcon = screen.getByText('uncheckedIcon');
    expect(uncheckedIcon).toBeInTheDocument();

    fireEvent.click(CheckBox);
    await sleep(0.3);

    const checkedIcon = screen.getByText('checkedIcon');
    expect(checkedIcon).toBeInTheDocument();
  });
});
