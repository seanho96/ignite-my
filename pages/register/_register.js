import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Form from './_form'
import { Text } from '../../components'
import CalendarIcon from '../../images/svg/calendar'
import TimeIcon from '../../images/svg/time'
import LocationIcon from '../../images/svg/location'

const RegisterSection = styled.section`
  width: 100%;
  display: flex;
`

const BannerContainer = styled.div`
  height: 1380px;
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  padding-top: 10rem;
`

const FormContainer = styled.div`
  display: flex;
  width: 50%;
  background-color: var(--color-white);
`

const BannerContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const StyledImage = styled(Image)`
  z-index: 0;
`

const ContentWrapper = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    align-items: center;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EventDetails = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > div:not(:last-child) {
    margin-bottom: 2rem;
  }
`
const Row = styled.div`
  display: flex;
  width: 40.2rem;
  justify-content: flex-start;
`

const Register = () => {
  return (
    <RegisterSection>
      <BannerContainer>
        <StyledImage
          src="/images/jpg/form-banner.jpg"
          alt="Sunset"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <BannerContent>
          <ContentWrapper>
            <LogoWrapper>
              <Image
                src="/images/png/ignite-yls-logo.png"
                alt="Ignite youth leadership summit logo"
                height={166}
                width={345}
              />
            </LogoWrapper>
            <EventDetails>
              <Row>
                <CalendarIcon />
                <Text size="3rem" color="white" ml="1.5rem">
                  4th September 2021
                </Text>
              </Row>
              <Row>
                <TimeIcon />
                <Text size="3rem" color="white" ml="1.5rem">
                  10am - 3.20pm
                </Text>
              </Row>
              <Row>
                <LocationIcon />
                <Text size="3rem" color="white" ml="1.5rem">
                  Hall 1, Dream Centre PJ
                </Text>
              </Row>
            </EventDetails>
          </ContentWrapper>
        </BannerContent>
      </BannerContainer>
      <FormContainer>
        <Form />
      </FormContainer>
    </RegisterSection>
  )
}

export default Register
