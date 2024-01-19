import React from 'react'
import logo from '../logo.svg'

import styled from 'styled-components'

export const Header: React.FC<{}> = ({}): JSX.Element => {
  return (
    <HeaderStyled className="nav-header">
      <ContainerStyled>
        <HeaderStack>
          <LogoWrapper>
            <AnchorStyled href={'https://kopimi.com/kopimi/'}>
              <ImageStyled src={logo} alt="Logo" />
            </AnchorStyled>
          </LogoWrapper>
          <NavStyled>
            <UlStyled>
              <LiStyled>
                <a href="#dynamic-table">Table</a>
              </LiStyled>
              <LiStyled>
                <a href="#transaction_search">Search</a>
              </LiStyled>
              <LiStyled>
                <a href="#create_account">Create Account</a>
              </LiStyled>
            </UlStyled>
          </NavStyled>
        </HeaderStack>
      </ContainerStyled>
    </HeaderStyled>
  )
}

const NavStyled = styled.nav`
  display: flex;
`

const UlStyled = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
`
const LiStyled = styled.li`
  font-size: 20px;
  position: relative;
  &:hover:before {
    content: '';
    background: #000000;
    width: 5px;
    height: 5px;
    border-radius: 100%;
    position: absolute;

    top: 100%;
    left: 50%;
  }
`

const LogoWrapper = styled.div`
  max-height: 100%;
  height: 80px;
  width: 80px;
`

const AnchorStyled = styled.a``

const ImageStyled = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const HeaderStack = styled.div`
  max-height: 100%;
  justify-items: stretch;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  flex: 1 1 0;
`

const ContainerStyled = styled.div`
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1 1 0;
`

const HeaderStyled = styled.header`
  padding: 18px;
  background-color: #76ffab;
  justify-content: space-between;
  position: relative;
  z-index: 20;
  height: 80px;

  img {
    display: flex;
  }

  ul,
  li {
    padding: 8px;
    margin: 24px;
    list-style: none;
  }
`
