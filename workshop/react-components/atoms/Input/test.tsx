// n
import { ReactElement } from 'react';
import { sleep } from '#libraries/async/sleep';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Input } from '.';

const glob = global as any;

describe('Input tests', () => {
  const input = screen.getByRole('input') as HTMLInputElement;

  let container: HTMLDivElement;

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render and onChange tests', async () => {
    const onChange = jest.fn();

    const getElement = () => (
      <Input native={{ onChange }}  />
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

    expect(input).toBeInTheDocument();
    expect(input.classList.contains('input')).toEqual(true);

    fireEvent.change(input, {target: {value: 'test-value'}});

    expect(onChange.mock.calls.length).toEqual(1);
    expect(Array.from(input.classList).includes('disabled')).not.toEqual(true);
    expect(input.value).toEqual('test-value');
  });
});
