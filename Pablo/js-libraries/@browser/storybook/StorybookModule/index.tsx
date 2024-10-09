import styled, { createGlobalStyle } from 'styled-components';
import { FC } from 'react';
import { StorybookHeader } from '#libraries/@browser/storybook/StorybookHeader';
import { StorybookSection } from '#libraries/@browser/storybook/StorybookSection';
import { StorybookModuleProps } from './types';

const GlobalStyles = createGlobalStyle`
  body,
  input,
  textarea {
    font-family: Georgia, serif;
  }

  body .storybook--header {
    padding-bottom: 8px;
  }

  body.storybook-theme--light {
    .storybook--header {
      border-bottom: 1px dashed #000000;
    }
  }

  body.storybook-theme--dark {
    .storybook--section,
    .storybook--module--headers,
    .storybook--module--content {
      color: #eaeaea;
    }

    .storybook--header {
      color: #4fd390;
      border-bottom: none;
    }

    .storybook--section--components-names {
      color: #8c8c8c;
    }
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-family: MonoSpace;
  height: 100vh;
  overflow: hidden;

  pre {
    line-height: 1.4;
  }

  > * {
    margin: 0;
    box-sizing: border-box;
  }

  .storybook--section--components-names {
    color: #858585;
    margin: 4px 0;
    line-height: 1rem;
  }

  .storybook--module--headers {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    z-index: 2;

    span {
      display: flex;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: 600;
      background-color: #35a0ff;
      color: white;
      padding: 10px;

      &:first-child {
        flex: 25%;
      }
    }
  }

  .storybook--module--content {
    padding-top: 30px;
    display: flex;
    overflow: hidden;
    height: 100%;
    width: 100%;

    .storybook--module--col {
      overflow-y: scroll;
    }
  }

  .storybook--module--col {
    border-right: 1px dashed lightgray;
    box-sizing: border-box;
    padding: 15px 18px;
  }

  section.storybook--section {
    padding: 12px 6px;
    line-height: 1.1rem;
    display: inline-block;
  }
`;

export const StorybookModule: FC<StorybookModuleProps> = ({
  columnsNames,
  contentRender,
}) => {
  return (
    <StyledDiv>
      <GlobalStyles />
      <div className="storybook--module--headers">
        {columnsNames.map((name, index) => {
          return (
            <span
              key={`storybook--module--header--${index + 1}`}
              className={`storybook--module--header--${index + 1} storybook--module--col storybook--module--col--${index + 1}`}
            >
              {name}
            </span>
          );
        })}
      </div>
      <div className="storybook--module--content">
        {columnsNames.map((name, index) => {
          return (
            <span
              key={`storybook--module--content--${index + 1}`}
              className={`storybook--module--content--${index + 1} storybook--module--col storybook--module--col--${index + 1}`}
            >
              {contentRender(name, {
                Header: StorybookHeader,
                Section: StorybookSection,
              })}
            </span>
          );
        })}
      </div>
    </StyledDiv>
  );
};
