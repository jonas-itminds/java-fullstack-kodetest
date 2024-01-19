import { PropsWithChildren, ReactNode, useState } from 'react'
import styled from 'styled-components'

export interface AccordionProps extends PropsWithChildren {
  headerText?: string
  children?: ReactNode
}

export const Accordion: React.FC<AccordionProps> = ({
  headerText,
  children
}): JSX.Element => {
  const [show, setShow] = useState(false)

  const handleOpen = () => {
    setShow(!show)
  }

  return (
    <AccordionWrapper>
      <AccordionHeader onClick={handleOpen}>
        {headerText || 'Accordion Header'}
        <AccordionChevron show={show}></AccordionChevron>
      </AccordionHeader>
      {show && <AccordionBody>{children}</AccordionBody>}
    </AccordionWrapper>
  )
}

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const AccordionChevron = styled.div<{ show: boolean }>`
  margin-left: 16px;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: ${({ show }) => (show ? `rotate(-135deg)` : `rotate(45deg)`)};
`

const AccordionHeader = styled.div`
  margin: 8px;
  text-align: center;
  min-width: 400px;
`

const AccordionBody = styled.div``
