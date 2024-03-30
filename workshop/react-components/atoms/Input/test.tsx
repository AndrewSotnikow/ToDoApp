// npx jest -i atoms/Input/test.ts
import { sleep } from '#libraries/async/sleep';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Input } from '.';

const glob = global as any;

describe('Input tests', () => {
  // TODO check why get by role not working
  // const getInputByRole = () => screen.getByRole('input') as HTMLInputElement;
  const getInputGetByDisplayValue = (
    value: string,
  ) => screen.getByDisplayValue(value) as HTMLInputElement;

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
    const inputValue = 'test-value';

    const getElement = () => (
      <Input native={{
        onChange,
        value: inputValue,
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

    const input = getInputGetByDisplayValue(inputValue);

    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(inputValue);
    expect(input.classList.contains('input')).toEqual(true);
    fireEvent.change(input, { target: { value: 'test-value1' } });

    // TODO finish tests
    await sleep(0.3);
    console.log(222, input.value);

    expect(input.value).toEqual('test-value1');
    // expect(onChange.mock.calls.length).toEqual(1);
    expect(input.value).toEqual('test-value1');
    expect(Array.from(input.classList).includes('disabled')).not.toEqual(true);
  });

  // TODO finish tests
  test('disabled test', async () => {
    const onChange = jest.fn();
    const inputValue = 'test-value';

    const getElement = () => (
      <Input native={{
        disabled: true,
        onChange,
        value: inputValue,
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

    const input = getInputGetByDisplayValue(inputValue);

    expect(input).toBeInTheDocument();
    expect(input.value).toEqual(inputValue);
    expect(input.classList.contains('input')).toEqual(true);
    fireEvent.change(input, { target: { value: 'test-value1' } });

    // TODO finish tests
    await sleep(0.3);
    console.log(222, input.value);

    expect(input.value).toEqual('test-value1');
    // expect(onChange.mock.calls.length).toEqual(1);
    expect(input.value).not.toEqual('test-value1');
    expect(Array.from(input.classList).includes('disabled')).toEqual(true);
  });

  test('debounce test', async () => {
    // debounce = 2sec
    // setTimout(() => checkNewValueFromOnChange() // true , 2000);
    // sleep(1.5sec);
    // checkNewValueFromOnChange(); // false
  });
});
