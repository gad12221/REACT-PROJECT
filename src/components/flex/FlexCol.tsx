import { FC, ReactNode } from 'react'

interface FlexColProps {
  children: ReactNode;
}

const FlexCol: FC<FlexColProps> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}

export default FlexCol;