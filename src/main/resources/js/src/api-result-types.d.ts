export interface Search {
  _links: SearchLinks
}

export interface SearchLinks {
  [key: string]: Find
  self: Self
}

export interface Find {
  href: string
  templated: boolean
}

export interface Self {
  href: string
}

export interface BankAPI {
  _embedded: Embedded
  _links: BankAPILinks
  page: Page
}

export type EmbeddedType = 'customers' | 'transactions' | 'accounts'

export interface Embedded {
  customers?: Customer[]
  accounts?: Account[]
  transactions?: Transaction[]
}

export interface Account {
  accountName: string
  balance: number
  _links: AccountLinks
}

export interface AccountLinks {
  self: Self
  account: Self
  customer: Self
  transactions: Self
}

export interface Customer {
  firstName: string
  lastName: string
  description: string
  _links: CustomerLinks
}

export interface CustomerLinks {
  self: Self
  customer: Self
  accounts: Self
}

export interface Transaction {
  transactionTime: Date
  description: string
  amount: number
  isDeposit: boolean
  _links: TransactionLinks
}

export interface TransactionLinks {
  self: Self
  transaction: Self
  account: Self
}

export interface BankAPILinks {
  self: Self
  profile: Self
  search?: Self
}

export interface Page {
  size: number
  totalElements: number
  totalPages: number
  number: number
}
