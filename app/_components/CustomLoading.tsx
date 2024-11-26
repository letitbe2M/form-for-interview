'use client';
import { CSSProperties } from 'react';
import DotLoader from 'react-spinners/DotLoader';

type Props = {
  isLoading?: boolean;
  color?: string;
  size?: number;
};

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

const CustomLoading = ({ isLoading = true, color = '#ff0000', size = 20 }: Props) => {
  return (
    <DotLoader
      color={color}
      loading={isLoading}
      cssOverride={override}
      size={size}
      aria-label='Loading Spinner'
      data-testid='loader'
    />
  );
};

export default CustomLoading;
