import { ElementType } from '../App'
import { TDStyled, THStyled, TRStyled, TableStyled } from '../styles'

export const DynamicTable: React.FC<{
  props: ElementType[] | null
}> = ({ props }): JSX.Element => {
  function dataCellMapping<T extends ElementType>(field: keyof T, element: T) {
    if (field === '_links') return undefined

    return (
      <TDStyled>{String(element[field] as string | number | boolean)}</TDStyled>
    )
  }

  function mapTableBody<T extends ElementType>(elements: T[]) {
    if (!elements) return [<></>]

    return elements.map((element: T) => {
      const elementArray: JSX.Element[] = []
      for (const key in element) {
        const mappedValue = dataCellMapping(key, element)
        if (mappedValue) elementArray.push(mappedValue)
      }

      return <TRStyled>{elementArray}</TRStyled>
    })
  }

  return (
    <>
      {props && props.length > 0 ? (
        <TableStyled>
          <tbody>
            <TRStyled>
              {Object.keys(props[0]).map((key) => {
                if (key.startsWith('_')) return <></>
                return <THStyled>{key}</THStyled>
              })}
            </TRStyled>
            {mapTableBody(props)}
          </tbody>
        </TableStyled>
      ) : (
        <></>
      )}
    </>
  )
}
