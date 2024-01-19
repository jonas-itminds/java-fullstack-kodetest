import styled from 'styled-components'

export const TableStyled = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  margin: 25px 0;
  font-size: 0.9em;
  /* font-family: sans-serif; */
  min-width: 400px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.25);
`
export const TRStyled = styled.tr`
  background-color: #c28759;
  color: #ffffff;
  text-align: left;
`
export const THStyled = styled.th`
  padding: 12px 15px;
  border-bottom: 1px solid rgba(150, 64, 0, 1);
`

export const TDStyled = styled.td`
  padding: 12px 15px;
`

export const FormWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 8px;
  background-color: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.6);
  border-radius: 25px;
`

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
`
