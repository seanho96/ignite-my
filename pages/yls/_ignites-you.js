import React from 'react'
import styled from 'styled-components'
import { Heading } from '../../components'

const SectionContainer = styled.section`
  width: 100%;
  padding: 8rem 0;
  background-color: ${(props) => props.bgcolor || 'var(--color-white)'};
  background: ${(props) => props.background};
`

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledHeading = styled(Heading)`
  -webkit-text-stroke: 1px ${(props) => props.stroke}; /* stroke width and color */
  -webkit-font-smoothing: antialiased;
  color: transparent;

  @media (max-width: 900px) {
    font-size: 3.6rem;
    line-height: 3.6rem;
  }
`

const IgnitesYou = () => {
  return (
    <>
      <SectionContainer bgcolor="var(--color-black)">
        <Container>
          <StyledHeading
            size="6.4rem"
            align="center"
            weight="bold"
            lh="6.4rem"
            fstyle="italic"
            stroke="var(--color-purple)"
          >
            WHAT IGNITES YOU?
          </StyledHeading>
          <StyledHeading
            size="6.4rem"
            align="center"
            weight="bold"
            lh="6.4rem"
            fstyle="italic"
            stroke="var(--color-orange)"
          >
            WHAT IGNITES YOU?
          </StyledHeading>
          <StyledHeading
            size="6.4rem"
            align="center"
            weight="bold"
            lh="6.4rem"
            fstyle="italic"
            stroke="var(--color-purple)"
          >
            WHAT IGNITES YOU?
          </StyledHeading>
          <StyledHeading
            size="6.4rem"
            align="center"
            weight="bold"
            lh="6.4rem"
            fstyle="italic"
            stroke="var(--color-orange)"
          >
            WHAT IGNITES YOU?
          </StyledHeading>
        </Container>
      </SectionContainer>
    </>
  )
}

export default IgnitesYou
