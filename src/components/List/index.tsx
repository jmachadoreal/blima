import type { ReactNode } from 'react'

import { Scroller, styles } from './styles'

interface Props {
  children: ReactNode
}

const List = ({ children }: Props) => {
  return (
    <Scroller
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {children}
    </Scroller>
  )
}

export default List
