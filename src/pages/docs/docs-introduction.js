import React from "react"
import Link from "next/link"

import { Container, Row, Col, Breadcrumb } from "react-bootstrap"

import DocsNav from "../../components/Docs/DocsNav"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Docs introduction",
    },
  }
}

const DocsIntroduction = () => {
  return (
    <React.Fragment>
      <section className="hero py-5 py-lg-7">
        <Container className="position-relative">
          <Breadcrumb listProps={{ className: "ps-0 justify-content-center" }}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/docs/docs-introduction" passHref>
              <Breadcrumb.Item>Documentation</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Introduction</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="hero-heading">Docs - Introduction</h1>
        </Container>
      </section>
      <section className="py-6">
        <Container fluid>
          <Row className="px-xl-5">
            <Col lg="2">
              <DocsNav />
            </Col>
            <Col lg="10" xl="8" className="docs-content">
              <p>
                Hey, welcome to the{" "}
                <strong>Directory React Theme official documentation</strong>.{" "}
              </p>
              <p>
                If you own a theme’s license already, thank you very much for
                purchasing! If not yet, you can{" "}
                <a href="https://themes.getbootstrap.com/product/directory-directory-listing-theme-react/">
                  buy the theme’s license here
                </a>
                .
              </p>
              <p>
                This documentation is to help you with template’s customization.
                At least basic React and React hooks knowledge is required to
                customize this template.{" "}
              </p>
              <hr className="my-5" />
              <h5 className="text-uppercase mb-5">Theme info</h5>
              <p>
                <span className="text-uppercase text-muted">Item Name:</span>{" "}
                Directory React
              </p>
              <p>
                <span className="text-uppercase text-muted">Item Version:</span>{" "}
                v 2.0.0
              </p>
              <p>
                <span className="text-uppercase text-muted">Author:</span>{" "}
                Bootstrapious
              </p>
              <p>
                <span className="text-uppercase text-muted">
                  Contact email for support &amp; pre-sale questions:{" "}
                </span>
                <a href="mailto:hello@bootstrapious.com" className="text-dark">
                  hello@bootstrapious.com
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default DocsIntroduction
