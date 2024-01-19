import { useEffect, useState } from 'react'
import {
  Account,
  BankAPI,
  Customer,
  EmbeddedType,
  Search,
  SearchLinks,
  Transaction
} from '../api-result-types'

export type PageOptionsType = {
  pageSize: number
  pageNumber: number
}

export function useFetchBankElements(
  embeddedType: EmbeddedType,
  pageOptions?: PageOptionsType
) {
  const [response, setResponse] = useState<
    Customer[] | Transaction[] | Account[] | null
  >(null)
  const url = '/api'

  useEffect(() => {
    const fetchElements = async (
      embeddedType: EmbeddedType,
      pageOptions?: PageOptionsType
    ) => {
      try {
        const pageOptionString = pageOptions
          ? `?size${pageOptions.pageSize}&page=${pageOptions.pageNumber}`
          : ''
        const elements: BankAPI = await (
          await fetch(`${url}/${embeddedType}${pageOptionString}`, {
            method: 'GET',
            headers: { Accept: 'application/json' }
          })
        ).json()
        const responseElements = elements._embedded[embeddedType]
        if (responseElements) setResponse(responseElements)
      } catch (error) {
        console.log('Bank element fetch failed')
        console.error(error)
      }
    }

    fetchElements(embeddedType, pageOptions)
  }, [])

  return response
}

export function useFetchSearches(embeddedType: EmbeddedType) {
  const [response, setResponse] = useState<
    | {
        embeddedType: EmbeddedType
        search: keyof SearchLinks
        input: string | string[] | null
      }[]
    | null
  >(null)
  const url = '/api'

  useEffect(() => {
    const fetchCustomers = async (embeddedType: EmbeddedType) => {
      try {
        const customers: Search = await (
          await fetch(`${url}/${embeddedType}/search`, {
            method: 'GET',
            headers: { Accept: 'application/json' }
          })
        ).json()
        const searchLinks = customers._links
        const searchLinkArray: {
          embeddedType: EmbeddedType
          search: keyof SearchLinks
          input: string | string[] | null
        }[] = []
        for (const key in searchLinks) {
          if (key === 'self') continue
          const href = searchLinks[key].href
          const inputs = href
            .substring(href.indexOf('{?') + 2, href.lastIndexOf('}'))
            .split(',')
          searchLinkArray.push({
            embeddedType: embeddedType,
            search: key,
            input: inputs
          })
        }
        if (searchLinkArray) setResponse(searchLinkArray)
      } catch (error) {
        console.log('Searches fetch failed')
        console.error(error)
      }
    }

    fetchCustomers(embeddedType)
  }, [])

  return response
}

export function useFetchElementsWithSearch(
  embeddedType: EmbeddedType,
  search?: keyof SearchLinks,
  inputString?: string[] | string,
  input?: string[] | string
) {
  const [response, setResponse] = useState<
    Customer[] | Transaction[] | Account[] | null
  >(null)
  const url = '/api'

  useEffect(() => {
    const fetchCustomers = async (
      embeddedType: EmbeddedType,
      search?: keyof SearchLinks,
      inputString?: string[] | string,
      input?: string[] | string
    ) => {
      if (!search) return
      try {
        const inputList: string[] = ['?']

        if (Array.isArray(inputString) && Array.isArray(input)) {
          if (inputString.length !== input?.length)
            throw new Error('input and inputList should have same length')
          for (let i = 0; i < inputString.length; i++) {
            inputList.push(`${inputString[i]}=${input[i]}`)
            if (i !== inputString.length - 1) inputList.push('&')
          }
        } else {
          inputList.push(`${inputString}=${input}`)
        }

        const customers: BankAPI = await (
          await fetch(
            `${url}/${embeddedType}/search/${search}${inputList.join('')}`,
            {
              method: 'GET',
              headers: { Accept: 'application/json' }
            }
          )
        ).json()
        const responseElements = customers._embedded[embeddedType]
        if (responseElements) setResponse(responseElements)
      } catch (error) {
        console.log('Search fetch failed')
        console.error(error)
      }
    }

    fetchCustomers(embeddedType, search, inputString, input)
  }, [])

  return response
}
