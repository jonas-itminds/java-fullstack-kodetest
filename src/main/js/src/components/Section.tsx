import { ReactNode } from 'react'
import styled from 'styled-components'

type SectionProps = {
  id?: string
  children?: ReactNode
}

export const Section = (props: SectionProps) => {
  return <Container id={props.id}>{props.children}</Container>
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 16px;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  flex-direction: column;
`
