import { useForm } from 'react-hook-form'
import { EmbeddedType, SearchLinks } from '../api-result-types'
import styled from 'styled-components'
import { useEffect } from 'react'
import { FormStyled, InputWrapper } from '../styles'

type DynamicFormProps = {
  embeddedType?: EmbeddedType

  search: keyof SearchLinks
  input: string | string[] | null
}

export const DynamicForm: React.FC<{
  props: DynamicFormProps | null
  onSubmit: (data: any) => any
}> = ({ props, onSubmit }): JSX.Element => {
  const formhook = useForm()
  useEffect(() => {
    formhook.setValue('search', props?.search)
    formhook.setValue('embeddedType', props?.embeddedType)
  }, [])

  return (
    <>
      {props && (
        <FormStyled onSubmit={formhook.handleSubmit(onSubmit)}>
          {Array.isArray(props.input) ? (
            props.input.map((single, idx) => (
              <InputWrapper>
                <label key={'label' + single + idx}>{single + ' :   '}</label>
                <input
                  key={'input' + single + idx}
                  {...formhook.register(single)}
                />
              </InputWrapper>
            ))
          ) : (
            <></>
          )}
          <input type="submit" value={'Submit'} />
        </FormStyled>
      )}
    </>
  )
}
