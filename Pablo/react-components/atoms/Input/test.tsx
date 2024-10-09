// npx jest -i atoms/Input/test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { sleep } from '#libraries/async/sleep';
import { Input } from '.';

const glob = global as any;

describe('Input tests', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render test', async () => {
    const onInput = jest.fn();
    const onChange = jest.fn();

    const getElement = () => (
      <Input
        native={{
          value: 'test-input-value',
          onInput,
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

    const input = screen.getByDisplayValue('test-input-value');
    expect(input).toBeInTheDocument();
    expect(onInput.mock.calls.length).toEqual(0);
    expect(onChange.mock.calls.length).toEqual(0);
  });

  test('onChange test', async () => {
    const onChange = jest.fn();
    const onInput = jest.fn();

    const getElement = () => (
      <Input
        native={{
          value: 'test-input-value',
          onInput,
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

    const input: HTMLInputElement = screen.getByDisplayValue('test-input-value');
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('test-input-value');

    fireEvent.input(input, { target: { value: '23' } });

    expect(input.value).toEqual('23');
    expect(onChange.mock.calls.length).toEqual(1);
  });
});
