import { Checkbox } from '.'
import { render, screen, fireEvent } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { sleep } from '#libraries/async/sleep'

const glob = global as any;

describe('Checkbox test', () => {
  let container: HTMLDivElement;
  const CheckedIcon = () => <span>checkedIcon</span>;

  const UncheckedIcon = () => <span>uncheckedIcon</span>;

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

  test('render checkbox', async ()=>{


    const getElement = () => (
      <Checkbox
        checkedIcon='checkedIcon'
        uncheckedIcon='uncheckedIcon'
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

    const checkbox = screen.getByDisplayValue('checkedIcon') as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
  })

  test('should fire onChange test', async () => {
    const onChange = getMockFn();

    const getElement = () => (
      <Checkbox
        checkedIcon='checkedIcon'
        uncheckedIcon='uncheckedIcon'
        native={{
          checked: false,
          onChange
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

    const checkbox = screen.getByDisplayValue('checkedIcon') as HTMLInputElement;
    fireEvent.change(checkbox);

    expect(checkbox.checked).toEqual(true);

    expect(onChange.countCalls).toEqual(0);
    await sleep(0.3);

    expect(onChange.countCalls).toEqual(1);
  });

  test('should disable checkbox test', async () => {
    const onChange = getMockFn();

    const getElement = () => (
      <Checkbox
        checkedIcon='some image'
        uncheckedIcon='some image'
        native={{
          checked: false,
          onChange,
          disabled: true
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

    const checkbox = screen.getByDisplayValue('checkedIcon')  as HTMLInputElement;
    fireEvent.change(checkbox);

    expect(checkbox.checked).toEqual(false);

    expect(onChange.countCalls).toEqual(0);

    await sleep(0.3);

    expect(onChange.countCalls).toEqual(0);
  });

  test('should render icon as string', async () => {

    const getElement = () => (
      <Checkbox
        checkedIcon='checked icon'
        uncheckedIcon='unchecked icon'
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

    const checkedIcon = screen.getByDisplayValue('checkedIcon')  as HTMLImageElement;
    const uncheckedIcon = screen.getByDisplayValue('uncheckedIcon')  as HTMLImageElement;

    expect(checkedIcon).toBeInTheDocument();
    expect(checkedIcon).toHaveAttribute('src', 'checked icon');

    expect(uncheckedIcon).toBeInTheDocument();
    expect(uncheckedIcon).toHaveAttribute('src', 'unchecked icon');
  });

  test('should render icon as ReactElement', async () => {

    const getElement = () => (
      <Checkbox
        checkedIcon={<CheckedIcon />}
        uncheckedIcon={<UncheckedIcon />}
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

    const checkedIcon = screen.getByDisplayValue('checkedIcon')  as HTMLImageElement;
    const uncheckedIcon = screen.getByDisplayValue('uncheckedIcon')  as HTMLImageElement;

    expect(checkedIcon).toBeInTheDocument();
    expect(checkedIcon).toHaveTextContent('checkedIcon');

    expect(uncheckedIcon).toBeInTheDocument();
    expect(uncheckedIcon).toHaveAttribute('uncheckedIcon');
  });
})
