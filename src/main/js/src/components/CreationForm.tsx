import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { FormStyled, FormWrapper, InputWrapper } from '../styles'

export const CreationForm: React.FC<{
  onSubmit: (data: any) => any
}> = ({ onSubmit }): JSX.Element => {
  const formhook = useForm()

  return (
    <FormWrapper>
      <FormStyled onSubmit={formhook.handleSubmit(onSubmit)}>
        <h2>Create Account</h2>
        <InputWrapper>
          <label key={'label-account-name'}>{'Account name :   '}</label>
          <input
            key={'input-account-name'}
            {...formhook.register('accountName')}
          />
        </InputWrapper>
        <InputWrapper>
          <label key={'label-balance'}>{'Balance :   '}</label>
          <input key={'input-balance'} {...formhook.register('balance')} />
        </InputWrapper>

        <input type="submit" value={'Submit'} />
      </FormStyled>
    </FormWrapper>
  )
}
