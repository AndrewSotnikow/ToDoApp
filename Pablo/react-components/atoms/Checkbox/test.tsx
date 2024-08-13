// npx jest -i atoms/Checkbox/test.ts
import { sleep } from '#libraries/async/sleep';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { Checkbox } from '.';

const glob = global as any;

describe('Checkbox tests', () => {
  const getCheckbox = (text: string) => {
    const checkbox = screen.getByText(text)
      .closest('span.checkbox')!
      .querySelector('.checkbox--input')!;
    expect(checkbox).toBeInTheDocument();

    return checkbox as HTMLInputElement;
  };

  let container: HTMLDivElement;

  beforeEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  test('render test', async () => {
    const onChange = jest.fn();

    const getElement = () => (
      <Checkbox
        checkIcon={['checkIcon']}
        uncheckIcon={['uncheckIcon']}
        native={{
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

    getCheckbox('uncheckIcon');
    expect(onChange.mock.calls.length).toEqual(0);
  });

  test('click test', async () => {
    const onClick = jest.fn();
    const onChange = jest.fn();

    const getElement = () => (
      <Checkbox
        checkIcon={['checkIcon']}
        uncheckIcon={['uncheckIcon']}
        native={{ onClick, onChange }}
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

    const checkbox = getCheckbox('uncheckIcon');

    expect(screen.getByText('uncheckIcon')).toBeInTheDocument();
    expect(screen.queryByText('checkIcon')).not.toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(onClick.mock.calls.length).toEqual(1);
    expect(onChange.mock.calls.length).toEqual(1);
    let { target } = onChange.mock.calls[0][0] as Record<string, HTMLInputElement>;
    expect(target.checked).toEqual(true);
    expect(checkbox.checked).toEqual(true);
    expect(screen.queryByText('uncheckIcon')).not.toBeInTheDocument();
    expect(screen.getByText('checkIcon')).toBeInTheDocument();

    fireEvent.click(checkbox);

    expect(onClick.mock.calls.length).toEqual(2);
    expect(onChange.mock.calls.length).toEqual(2);
    target = (onChange.mock.calls[0][0] as Record<string, HTMLInputElement>).target;
    expect(target.checked).toEqual(false);
    expect(checkbox.checked).toEqual(false);
    expect(screen.getByText('uncheckIcon')).toBeInTheDocument();
    expect(screen.queryByText('checkIcon')).not.toBeInTheDocument();
  });

  test('property "checked" test', async () => {
    const getElement = () => (
      <Checkbox
        checkIcon={['checkIcon']}
        uncheckIcon={['uncheckIcon']}
        native={{
          checked: true,
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

    const checkbox = getCheckbox('checkIcon');

    expect(screen.queryByText('uncheckIcon')).not.toBeInTheDocument();
    expect(screen.getByText('checkIcon')).toBeInTheDocument();
    expect(checkbox.checked).toEqual(true);

    fireEvent.click(checkbox);

    expect(screen.getByText('uncheckIcon')).toBeInTheDocument();
    expect(screen.queryByText('checkIcon')).not.toBeInTheDocument();
    expect(checkbox.checked).toEqual(false);
  });
});
