// npx jest -i atoms/Button/test.ts
import { ReactElement } from 'react';
import { sleep } from '#libraries/async/sleep';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Button } from '.';

const glob = global as any;

describe('Button tests', () => {
  const getButtonByText = (text: string) => screen.getByText(text).closest('button') as HTMLButtonElement;

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
});
