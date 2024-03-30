// npx jest -i atoms/Button/test.ts
import { sleep } from '#libraries/async/sleep';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Button } from '.';

const glob = global as any;

describe('Button tests', () => {
  const getButtonByText = (text: string) => screen.getByText(
    text,
  ).closest('button') as HTMLButtonElement;
  const onClick = jest.fn();
  let container: HTMLDivElement;

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render and click tests', async () => {


    const getElement = () => (
      <Button native={{ onClick }}>
        test-button
      </Button>
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

    const button = getButtonByText('test-button');
    expect(button).toBeInTheDocument();
    expect(button.classList.contains('button')).toEqual(true);

    fireEvent.click(button);

    expect(onClick.mock.calls.length).toEqual(1);
    expect(Array.from(button.classList).includes('disabled')).not.toEqual(true);
  });

  // TODO develop test
  test('disabled test', () => {
    const onClick = jest.fn();

    const getElement = () => (
      <Button native={{ onClick, disabled: true }}>
        test-button
      </Button>
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


    const button = getButtonByText('test-button');
    const icon = screen.getByText('test-icon') as HTMLSpanElement;
    expect(button.classList.contains('button')).toEqual(true);

    fireEvent.click(button);

    expect(onClick.mock.calls.length).toEqual(0);
    expect(Array.from(button.classList).includes('disabled')).toEqual(true);

  });

  test('icon test', () => {
    const onClick = jest.fn();

    const getElement = () => (
      <Button native={{ onClick }} icon={<div>test-icon</div>}>
        test-button
      </Button>
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


    const button = getButtonByText('test-button');
    const icon = screen.getByText('test-icon');
    expect(button).toBeInTheDocument(); // do I need to check it here?
    expect(icon).toBeInTheDocument();
    expect(icon.classList.contains('icon-wrapper')).toEqual(true);
  });

  test('icon position test', () => {
    const getElement = () => (
      <Button native={{ onClick }} iconPosition='right' icon={<>test-icon</>}>
        test-button
      </Button>
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


    const button = getButtonByText('test-button');
    const icon = screen.getByText('test-icon') as HTMLSpanElement;
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument(); // do I  need to check it here?
    expect(icon.classList.contains('icon-wrapper')).toEqual(true);
    expect(icon.classList.contains('icon--right')).toEqual(true); // not sure about the class concatenation
  });
});
