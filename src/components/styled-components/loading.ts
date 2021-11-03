import styled, { css, keyframes } from "styled-components";

export const LoadingContainer = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const spin = keyframes`
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
`;

export const LoadingAnimation = styled.div<{
  backgroundColor?: string;
}>`
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(
    0deg,
    rgba(63, 249, 220, 0.1) 33%,
    rgba(63, 249, 220, 1) 100%
  );
  animation: ${spin} 0.8s linear 0s infinite;

  // デフォルトではサブコンテナのバックグラウンドカラー
  ${({ backgroundColor = "#100e1d" }) => css`
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      background-color: ${backgroundColor};
      border-radius: 50%;
    }
  `}
`;
