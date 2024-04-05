// npx jest -i atoms/Input/test.ts
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { sleep } from '#libraries/async/sleep';
import { Input } from '.';

const glob = global as any;

describe('Input tests', () => {
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

  test('render test', async () => {
    const getElement = () => (
      <Input
        native={{
          value: 'test-input-value',
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

    const input = screen.getByDisplayValue('test-input-value') as HTMLInputElement;
    expect(input).toBeInTheDocument();
  });

  test('onChange test', async () => {
    const onChange = getMockFn();
    const onInput = getMockFn();

    const getElement = () => (
      <Input
        debounceMs={300}
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
    expect(input.value).toEqual('test-input-value');

    fireEvent.change(input, { target: { value: '23' } });
    expect(input.value).toEqual('23');
    expect(onChange.countCalls).toEqual(0);
    await sleep(0.3);

    expect(onChange.countCalls).toEqual(1);
  });

  test('enabled test', async () => {
    const onChange = getMockFn();
    const inputValue = 'test-value';

    const getElement = () => (
      <Input native={{
        value: inputValue,
        onChange,
        disabled: false,
      }} />
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

    const input = screen.getByDisplayValue(inputValue) as HTMLInputElement;
    expect(input.classList.contains('input--disabled')).toEqual(false);
    expect(input.classList.contains('disabled')).toEqual(false);
    expect(input.disabled).toEqual(false);
  });

  test('disabled test', async () => {
    const onChange = getMockFn();
    const inputValue = 'test-value--disabled';

    const getElement = () => (
      <Input native={{
        value: inputValue,
        onChange,
        disabled: true,
      }} />
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

    const input = screen.getByDisplayValue(inputValue) as HTMLInputElement;
    expect(input.classList.contains('input--disabled')).toEqual(true);
    expect(input.classList.contains('disabled')).toEqual(true);
    expect(input.disabled).toEqual(true);
  });

  test('debounce test', async () => {
    // TODO finish tests
  });
});
