import React from "react"

import Link from "next/link"

import { Container, Button } from "react-bootstrap"

import { FormContext } from "../components/FormContext"

import ProgressBar from "../components/ProgressBar"

import data from "../data/user-add.json"
import Image from "../components/CustomImage"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      loggedUser: true,
      title: "Add your listing",
      listingForm: true,
    },
  }
}

const UserAdd5 = () => {
  const [formInputs, setFormInputs] = React.useContext(FormContext)

  console.log(formInputs)
  return (
    <React.Fragment>
      <ProgressBar progress={100} />
      <section className="py-5">
        <Container className="text-center">
          <p className="subtitle text-primary">{data[5].subtitle}</p>
          <h1 className="h2 mb-5">{data[5].title}</h1>
          <p className="mb-5">
            <Image
              src="/content/img/illustration/undraw_celebration_0jvk.svg"
              width={400}
              height={279}
              layout="intrinsic"
              alt=""
              className="img-fluid"
            />
          </p>
          <p className="mb-5 text-muted">{data[5].content}</p>
          <p className="mb-5">
            <Link href={data[5].buttons[0].link} passHref>
              <Button className="me-2 mb-2">{data[5].buttons[0].title}</Button>
            </Link>
            <Link href={data[5].buttons[1].link} passHref>
              <Button variant="outline-muted" className="mb-2">
                {data[5].buttons[1].title}
              </Button>
            </Link>
          </p>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default UserAdd5
