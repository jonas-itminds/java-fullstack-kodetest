import styled from 'styled-components'
import { DynamicForm } from './DynamicForm'
import { Section } from './Section'
import { EmbeddedType, SearchLinks } from '../api-result-types'
import { FormWrapper } from '../styles'

type InputListProps = {
  embeddedType?: EmbeddedType

  search: keyof SearchLinks
  input: string | string[] | null
}[]

type SubmitReturnType = { searchInput: string | string[] } | InputListProps

type Formvalues = {
  [key: string]: string
}

export const DynamicQuery: React.FC<{
  props: InputListProps | null
  onSubmit?: (data: any) => any
}> = ({ props, onSubmit }): JSX.Element => {
  return (
    <div>
      {props && props.length > 0 ? (
        props.map((prop, index) => (
          <Section key={`section_dQuery_${index}`}>
            <FormWrapperStyled>
              <h2 key={`h2_dQuery_${index}`}>{prop.search}</h2>
              <DynamicForm
                key={`form_dQuery_${index}`}
                props={prop}
                onSubmit={onSubmit ? onSubmit : () => {}}
              />
            </FormWrapperStyled>
          </Section>
        ))
      ) : (
        <></>
      )}
    </div>
  )
}

const FormWrapperStyled = styled(FormWrapper)`
  background-color: rgb(233, 233, 233);
`
