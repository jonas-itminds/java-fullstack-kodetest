import { useState } from 'react'
import { Accordion } from './components/Accordion'
import './App.css'
import { DynamicQuery } from './components/DynamicQuery'
import { DynamicTable } from './components/DynamicTable'
import { Header } from './components/Header'
import { Section } from './components/Section'
import {
  Account,
  BankAPI,
  Customer,
  EmbeddedType,
  SearchLinks,
  Transaction
} from './api-result-types'
import { useFetchBankElements, useFetchSearches } from './util/customHooks'
import styled from 'styled-components'
import { CreationForm } from './components/CreationForm'

export type SearchDataType = {
  embeddedType?: EmbeddedType
  search?: keyof SearchLinks
  inputString?: string[] | string
  input?: string[] | string
}

type AccountInput = {
  accountName: string
  balance: number
  customer_id: number
}

export type ElementType = Transaction | Customer | Account

const App = () => {
  const [responseData, setresponseData] = useState<ElementType[] | null>(null)
  const customers = useFetchBankElements('customers')
  const transactionSearches = useFetchSearches('transactions')
  const accountSearches = useFetchSearches('accounts')

  const fetchCustomers = async (searchData: SearchDataType) => {
    if (!searchData.embeddedType) return null
    if (!searchData.search) return null
    const url = '/api'
    try {
      const inputList: string[] = ['?']

      if (
        Array.isArray(searchData.inputString) &&
        Array.isArray(searchData.input)
      ) {
        if (searchData.inputString.length !== searchData.input?.length)
          throw new Error('input and inputList should have same length')
        for (let i = 0; i < searchData.inputString.length; i++) {
          inputList.push(`${searchData.inputString[i]}=${searchData.input[i]}`)
          if (i !== searchData.inputString.length - 1) inputList.push('&')
        }
      } else {
        inputList.push(`${searchData.inputString}=${searchData.input}`)
      }

      const elements: BankAPI = await (
        await fetch(
          `${url}/${searchData.embeddedType}/search/${
            searchData.search
          }${inputList.join('')}`,
          {
            method: 'GET',
            headers: { Accept: 'application/json' }
          }
        )
      ).json()
      const responseElements = elements._embedded[searchData.embeddedType]
      if (responseElements) return responseElements
    } catch (error) {
      console.log('Search fetch failed')
      console.error(error)
    }
    return null
  }

  const createAccount = async (data: any) => {
    const accountInput: AccountInput = {
      accountName: data.accountName,
      balance: data.balance,
      customer_id: 1
    }

    const url = '/api'
    await fetch(`${url}/create/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountInput)
    })
  }

  const onSubmit = async (data: any) => {
    const filtered = Object.fromEntries(
      Object.entries(data).filter(
        ([key]) => !['search', 'embeddedType'].includes(key)
      )
    )
    const extracted = {
      embeddedType: data.embeddedType,
      search: data.search,
      inputString: Object.keys(filtered),
      input: Object.values(filtered)
    } as SearchDataType
    setresponseData(await fetchCustomers(extracted))
  }

  return (
    <>
      <Header />
      <Section>
        <TableHeader>Customer</TableHeader>
        <DynamicTable props={customers} />
      </Section>

      <Section id={'dynamic-table'}>
        {responseData && (
          <>
            <TableHeader>Search query results:</TableHeader>
            <DynamicTable props={responseData} />
          </>
        )}
      </Section>
      <Section id={'transaction_search'}>
        <Accordion headerText="Transaction search queries">
          <DynamicQuery props={transactionSearches} onSubmit={onSubmit} />
        </Accordion>
      </Section>
      <Section id={'account_search'}>
        <Accordion headerText="Account search queries">
          <DynamicQuery props={accountSearches} onSubmit={onSubmit} />
        </Accordion>
      </Section>
      <Section id="create_account">
        <CreationForm onSubmit={createAccount} />
      </Section>
    </>
  )
}
export default App

const TableHeader = styled.h2`
  text-align: center;
`
