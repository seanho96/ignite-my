import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { Formik, Form, Field, useField, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Image from 'next/image'
import { TextField, Checkbox, Select, MenuItem, InputLabel } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import FirebaseContext from '@/context/firebase'
import { doesEmailExist } from '@/helpers/firebase'
import { Button, Text } from '@/components/index'
import { useAuth } from '@/helpers/auth'
import SuccessIcon from '@/images/svg/success'
import InstaIcon from '@/images/svg/insta-no-outline'
import Modal from './_modal'

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      // margin: theme.spacing(1)
    },

    '.MuiMenuItem-root': {
      fontSize: '1.2rem'
    }
  }
}))

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6600'
    }
  },
  typography: {
    fontFamily: ['Gotham', 'sans-serif'].join(',')
  }
})

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 4rem 8rem;
  background-color: var(--color-black);
`

const FlexCenter = styled.div`
  display: flex;
  flex-direction: ${(props) => props.fd};
  justify-content: center;
  align-items: center;
`

const RegisteredContainer = styled(Container)`
  background-color: var(--color-black);
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 10rem 0;
`

const StyledInstaIcon = styled(InstaIcon)`
  margin-right: 1.8rem;
`

const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 4rem auto 0;
`

const StyledAlert = styled(Alert)`
  margin-bottom: 2rem;
`

const StyledTextField = styled(TextField)`
  color: var(--color-white);
  margin: 1.2rem 0 !important;

  > label {
    font-size: 1.6rem;
    color: var(--color-white);
    top: -5px;
  }

  > div {
    background-color: var(--color-white);
    border-radius: 8px;
    font-size: 1.4rem;

    input {
      padding: 0.8rem 1.2rem;
      height: 36px;
    }
  }

  > p {
    font-size: 1.2rem;
  }
`

const StyledSelect = styled(Select)`
  background-color: var(--color-white);
  border-radius: 8px;
  height: 52px;
  margin: 1.2rem 0;

  div {
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    display: flex;
    height: 100%;
    align-items: center;
  }

  svg {
    right: 12px;
    font-size: 2.5rem;
  }
`

const CustomTextField = ({ ...props }) => {
  const [field, meta] = useField(props)
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <StyledTextField
      InputLabelProps={{
        shrink: true
      }}
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  )
}

const CustomSelect = ({ ...props }) => {
  const [field, meta] = useField(props)
  return (
    <StyledSelect {...props} {...field}>
      {props.children}
    </StyledSelect>
  )
}

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;

  .MuiCheckbox-root {
    color: var(--color-white);
  }

  .MuiCheckbox-colorSecondary.Mui-checked {
    color: var(--color-orange);
  }

  label {
    font-size: 1.6rem;

    span {
      cursor: pointer;
      text-decoration: none;
      color: var(--color-orange);
    }
    span:hover {
      text-decoration: underline;
      text-underline-offset: 2px;
    }
  }
`

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 1.4rem;
`

const ActiveOccupationWrapper = styled.div`
  display: flex;
  margin-right: 2rem;

  label {
    border: ${({ isActive }) =>
      isActive ? '1px solid var(--color-orange)' : '1px solid var(--color-black)'};
    background-color: ${({ isActive }) =>
      isActive ? 'var(--color-orange)' : 'var(--color-white)'};
    border-radius: 6px;
    padding: 1.8rem 6.6rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    input {
      display: none;
    }

    ${Text} {
      color: ${({ isActive }) => (isActive ? 'var(--color-white)' : 'var(--color-black)')};
    }
    @media (max-width: 1120px) {
      padding: 1.8rem 4rem;
    }
    @media (max-width: 900px) {
      width: 100%;
      margin-right: 0;
    }
  }
  @media (max-width: 900px) {
    margin-right: 0;
  }
`

const OccupationWrapper = styled.div`
  display: flex;

  label {
    border: ${({ isActive }) =>
      isActive ? '1px solid var(--color-black)' : '1px solid var(--color-orange)'};
    background-color: ${({ isActive }) =>
      isActive ? 'var(--color-white)' : 'var(--color-orange)'};
    border-radius: 6px;
    padding: 1.8rem 6.6rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    input {
      display: none;
    }

    ${Text} {
      color: ${({ isActive }) => (isActive ? 'var(--color-black)' : 'var(--color-white)')};
    }

    @media (max-width: 1120px) {
      padding: 1.8rem 4rem;
    }
    @media (max-width: 900px) {
      width: 100%;
      margin-top: 2rem;
    }
  }
`

const StyledLabel = styled(InputLabel)`
  color: var(--color-white) !important;
  font-size: 1.2rem !important;
  margin-top: 1.2rem;
`

const TabWrapper = styled.div`
  display: flex;
  margin: 1.2rem 0;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`

const validationSchema = yup.object({
  fullName: yup.string().required("Please don't forget your full name"),
  email: yup
    .string()
    .email('Your email has got to be in the right format yeah')
    .required("Please don't forget to include your email address"),
  password: yup.string().required('Your password is required'),
  age: yup
    .string()
    .max(2, "You can't be that old...")
    .required("We need this so that we'll know your birthday"),
  myKad: yup
    .string()
    .matches(/^[0-9]+$/, 'Please only include the numbers of your myKad')
    .required("Please don't forget about your myKad number"),
  contactNumber: yup
    .string()
    .max(14)
    .required("Don't forget your contact number in case we need to give you a ring."),
  address: yup.string().required("Don't forget to include your address"),
  city: yup.string().required("Don't forget to include your city"),
  checked: yup.bool().oneOf([true], 'You have to check this to prcoeed')
})

const RegistrationForm = () => {
  const classes = useStyles()
  const router = useRouter()
  const { firebase } = useContext(FirebaseContext)

  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [registered, setRegistered] = useState(false)
  const [isActive, setActive] = useState(true)

  const handleSignUp = async (values, actions) => {
    // event.preventDefault()
    actions.setSubmitting(true)

    const emailExists = await doesEmailExist(values.email)
    console.log(values)
    if (!emailExists) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)

        // authentication
        // -> emailAddress & password & fullName (displayName)
        await createdUserResult.user.updateProfile({
          displayName: values.fullName
        })

        // firebase user collection (create a document)
        await firebase.firestore().collection('users').add({
          userId: createdUserResult.user.uid,
          fullName: values.fullName,
          email: values.email,
          age: values.age,
          myKad: values.myKad,
          contactNumber: values.contactNumber,
          address: values.address,
          city: values.city,
          occupation: values.occupation,
          state: values.state,
          dateCreated: Date.now()
        })
        setRegistered(true)
        actions.setSubmitting(false)

        setTimeout(() => {
          router.push('/')
        }, 8000)
      } catch (error) {
        actions.resetForm()
        setError(error.message)
      }
    } else {
      values.email = ''
      setError('That email is already taken, please try another.')
    }
  }

  const user = useAuth()

  return (
    <ThemeProvider theme={theme}>
      {registered ? (
        <RegisteredContainer>
          <SuccessIcon />
          {user && (
            <Text color="white" size="2.4rem" align="center" m="4.5rem 0">
              Hey {user.displayName}!
              <br />
              Your registration is complete.
              <br />
              See you at IGNITEMY
            </Text>
          )}
          <Button orange="true">
            <StyledInstaIcon />
            <a
              href="https://instagram.com/ignitemy______"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'var(--color-white)' }}
            >
              Follow us for more updates
            </a>
          </Button>
          <Text color="white" size="2rem" align="center" m="4.5rem 0">
            Redirecting you back to the homepage...
          </Text>
        </RegisteredContainer>
      ) : (
        <Container>
          <FlexCenter>
            <Image src="/images/png/sign-me-up.png" height={82} width={461} />
          </FlexCenter>
          <Formik
            initialValues={{
              fullName: '',
              email: '',
              age: '',
              myKad: '',
              contactNumber: '',
              address: '',
              city: '',
              occupation: '',
              state: '',
              checked: false
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => handleSignUp(values, actions)}
          >
            {({ resetForm, resetErrors, values, errors, isSubmitting, dirty, isValid }) => (
              <StyledForm className={classes.root}>
                {!registered && error && (
                  <StyledAlert severity="error">
                    <Text size="1.2rem">{error}</Text>
                  </StyledAlert>
                )}
                <Field
                  name="fullName"
                  label="Full Name"
                  placeholder="Your full name here"
                  required
                  as={CustomTextField}
                />
                <Field
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="Your email address here"
                  required
                  as={CustomTextField}
                />
                <Field
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Your password here"
                  required
                  as={CustomTextField}
                />
                <Field
                  type="number"
                  name="age"
                  label="Age"
                  placeholder="Your age name here"
                  required
                  as={CustomTextField}
                />
                <Field
                  type="string"
                  name="myKad"
                  label="MyKad Number"
                  placeholder="Your MyKad number here"
                  required
                  as={CustomTextField}
                />
                <Field
                  type="tel"
                  name="contactNumber"
                  label="Contact Number"
                  placeholder="Your contact number here"
                  required
                  as={CustomTextField}
                />
                <Field
                  name="address"
                  label="Address"
                  placeholder="Your address here"
                  required
                  as={CustomTextField}
                />
                <Field
                  name="city"
                  label="City"
                  placeholder="Your city here"
                  required
                  as={CustomTextField}
                />
                <StyledLabel htmlFor="State">State *</StyledLabel>
                <Field name="state" label="State" place="State" required as={CustomSelect}>
                  <MenuItem value="Johor">Johor</MenuItem>
                  <MenuItem value="Kedah">Kedah</MenuItem>
                  <MenuItem value="Kelantan">Kelantan</MenuItem>
                  <MenuItem value="Kuala Lumpur">Kuala Lumpur</MenuItem>
                  <MenuItem value="Labuan">Labuan</MenuItem>
                  <MenuItem value="Malacca">Malacca</MenuItem>
                  <MenuItem value="Negeri Sembilan">Negeri Sembilan</MenuItem>
                  <MenuItem value="Pahang">Pahang</MenuItem>
                  <MenuItem value="Penang">Penang</MenuItem>
                  <MenuItem value="Perak">Perak</MenuItem>
                  <MenuItem value="Perlis">Perlis</MenuItem>
                  <MenuItem value="Putrajaya">Putrajaya</MenuItem>
                  <MenuItem value="Sabah">Sabah</MenuItem>
                  <MenuItem value="Sarawak">Sarawak</MenuItem>
                  <MenuItem value="Selangor">Selangor</MenuItem>
                  <MenuItem value="Terengganu">Terengganu</MenuItem>
                </Field>
                <TabWrapper>
                  <ActiveOccupationWrapper isActive={isActive} onClick={() => setActive(true)}>
                    <label>
                      <Field type="radio" name="occupation" value="student" />
                      <Text>Student</Text>
                    </label>
                  </ActiveOccupationWrapper>
                  <OccupationWrapper isActive={isActive} onClick={() => setActive(false)}>
                    <label>
                      <Field type="radio" name="occupation" value="teacher" />
                      <Text>Teacher</Text>
                    </label>
                  </OccupationWrapper>
                </TabWrapper>
                <CheckboxGroup>
                  <Field type="checkbox" name="checked" as={Checkbox} />
                  <label htmlFor="checked" style={{ color: 'var(--color-white)' }}>
                    I have read the <span onClick={() => setShow(true)}>terms & conditions</span>
                  </label>
                </CheckboxGroup>
                <StyledErrorMessage name="checked" component="div" />

                {/* <pre style={{ color: 'white' }}>{JSON.stringify(values, null, 2)}</pre>
                <pre style={{ color: 'white' }}>{JSON.stringify(errors, null, 2)}</pre> */}
                <ButtonWrapper>
                  <Button orange="true" type="submit" disabled={!isValid || !dirty || isSubmitting}>
                    Register For Event
                  </Button>
                </ButtonWrapper>
              </StyledForm>
            )}
          </Formik>
        </Container>
      )}
      <Modal show={show} closeModal={() => setShow(false)} />
    </ThemeProvider>
  )
}

export default RegistrationForm
