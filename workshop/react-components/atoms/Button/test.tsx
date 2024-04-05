// npx jest -i atoms/Button/test.tsx
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
  let container: HTMLDivElement;

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render and click tests', async () => {
    const onClick = jest.fn();
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

  test('disabled test', async () => {
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
    expect(button.classList.contains('button')).toEqual(true);

    fireEvent.click(button);

    expect(onClick.mock.calls.length).toEqual(0);
    expect(Array.from(button.classList).includes('disabled')).toEqual(true);
  });

  test('icon test', async () => {
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

    const icon = screen.getByText('test-icon')?.closest('span') as HTMLSpanElement;
    expect(icon).toBeInTheDocument();
    expect(icon.classList.contains('button--icon-wrapper')).toEqual(true);
  });

  test('icon position test', async () => {
    const getElement = () => (
      <Button
        icon={<label>icon-test</label>}
      >
        test-button
      </Button>
    );

    const { rerender } = render(
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

    let buttonIconWrapper = screen.getByText('icon-test').closest('.button--icon-wrapper')!;
    expect(buttonIconWrapper).toBeInTheDocument();
    expect(buttonIconWrapper).toHaveClass('button--icon-wrapper--left');
    expect(buttonIconWrapper.nextSibling).toHaveClass('button--content');

    rerender(<Button icon={<label>icon-test</label>} iconPosition="right">test-button</Button>);

    buttonIconWrapper = screen.getByText('icon-test').closest('.button--icon-wrapper')!;
    expect(buttonIconWrapper).toBeInTheDocument();
    expect(buttonIconWrapper).toHaveClass('button--icon-wrapper--right');
    expect(buttonIconWrapper.previousSibling).toHaveClass('button--content');
  });
});
