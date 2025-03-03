import React from "react"

import Link from "next/link"

import { Container, Row, Col, Card, Button, Breadcrumb } from "react-bootstrap"

import data from "../data/pricing.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Pricing",
    },
  }
}

const Pricing = () => {
  return (
    <React.Fragment>
      <section className="hero py-5 py-lg-7">
        <Container className="position-relative">
          <Breadcrumb listProps={{ className: "ps-0 justify-content-center" }}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{data.subtitle}</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="hero-heading">{data.title && data.title}</h1>
          <Row>
            <Col xl="8" className="mx-auto">
              <p className="text-lg text-muted mb-5">
                {data.content && data.content}
              </p>
              <p className="mb-0">
                <Button href="#" className="me-4">
                  Get started
                </Button>
                <Button href="#" variant="outline-primary">
                  Contact sales
                </Button>
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <Row>
            {data.columns &&
              data.columns.map((column, index) => (
                <Col key={column.title} lg="4">
                  <Card
                    className={`mb-5 mb-lg-0 border-0 ${
                      index === 1 ? "card-highlight shadow-lg" : "shadow"
                    }`}
                  >
                    {index === 1 && <div className="card-status bg-primary" />}
                    <Card.Body>
                      <h2 className="text-base subtitle text-center text-primary py-3">
                        {column.title}
                      </h2>
                      <p className="text-muted text-center">
                        <span className="h1 text-dark">{column.price}</span>
                        <span className="ms-2">/ month</span>
                      </p>
                      <hr />
                      <ul className="fa-ul my-4">
                        {column.items.map((item) => (
                          <li
                            key={item.title}
                            className={`mb-3 ${
                              item.status ? "" : "text-muted"
                            }`}
                          >
                            {item.status ? (
                              <span className="fa-li text-primary">
                                <FontAwesomeIcon icon={faCheck} />
                              </span>
                            ) : (
                              <span className="fa-li">
                                <FontAwesomeIcon icon={faTimes} />
                              </span>
                            )}
                            {item.title}
                          </li>
                        ))}
                      </ul>
                      <div className="text-center">
                        <Button href="#" variant="outline-primary">
                          Select
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Pricing
