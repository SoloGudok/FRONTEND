import React from "react"

import Link from "next/link"

import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap"

import data from "../data/contact.json"
import Image from "../components/CustomImage"
import Icon from "../components/Icon"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebook,
  faInstagram,
  faPinterest,
  faTwitter,
  faVimeo,
} from "@fortawesome/free-brands-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Contact",
    },
  }
}

const Contact = () => {
  return (
    <React.Fragment>
      <section className="hero py-6 py-lg-7 text-white dark-overlay">
        {data.img && (
          <Image
            src={`/content/img/photo/${data.img}`}
            alt={data.title}
            className="bg-image"
            loading="eager"
            layout="fill"
          />
        )}
        <Container className="overlay-content">
          <Breadcrumb
            listProps={{
              className: "text-white justify-content-center no-border mb-0",
            }}
          >
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>{data.subtitle}</Breadcrumb.Item>
          </Breadcrumb>

          <h1 className="hero-heading">{data.title}</h1>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <Row>
            {data.address && (
              <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <Icon
                    icon="map-location-1"
                    className="w-2rem h-2rem text-primary"
                  />
                </div>
                <h3 className="h5">{data.address.title}</h3>
                <p className="text-muted">
                  {data.address.row1}
                  <br />
                  {data.address.row2}
                  <br />
                  <span
                    dangerouslySetInnerHTML={{ __html: data.address.row3 }}
                  />
                </p>
              </Col>
            )}
            {data.callcenter && (
              <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <Icon icon="mail-1" className="w-2rem h-2rem text-primary" />
                </div>
                <h3 className="h5">{data.callcenter.title}</h3>
                <p className="text-muted">{data.callcenter.content}</p>
                <p className="text-muted">
                  <strong>{data.callcenter.phone}</strong>
                </p>
              </Col>
            )}
            {data.electronicsupport && (
              <Col md="4" className="text-center text-md-start mb-4 mb-md-0">
                <div className="icon-rounded mb-4 bg-primary-light">
                  <Icon
                    icon="map-location-1"
                    className="w-2rem h-2rem text-primary"
                  />
                </div>
                <h3 className="h5">{data.electronicsupport.title}</h3>
                <p className="text-muted">{data.electronicsupport.content}</p>
                <ul className="list-unstyled text-muted">
                  {data.electronicsupport.emails.map((email) => (
                    <li key={email}>{email}</li>
                  ))}
                </ul>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <section className="py-6 bg-gray-100">
        <Container>
          <h2 className="h4 mb-5">Contact form</h2>
          <Row>
            <Col md="7" className="mb-5 mb-md-0">
              <Form>
                <div className="controls">
                  <Row>
                    <Col sm="6">
                      <div className="mb-4">
                        <Form.Label htmlFor="name">
                          Your First Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="mb-4">
                        <Form.Label htmlFor="surname">
                          Your Last Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="surname"
                          id="surname"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mb-4">
                    <Form.Label htmlFor="email">Your email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <Form.Label htmlFor="message">
                      Your message for us *
                    </Form.Label>
                    <Form.Control
                      type="textarea"
                      rows="4"
                      name="message"
                      id="message"
                      placeholder="Enter your message"
                      required
                    />
                  </div>
                  <Button type="submit" variant="outline-primary">
                    Send message
                  </Button>
                </div>
              </Form>
            </Col>
            <Col md="5">
              <div className="ps-lg-4">
                {data.content && (
                  <div dangerouslySetInnerHTML={{ __html: data.content }} />
                )}
                {data.social && (
                  <div className="social">
                    <ul className="list-inline">
                      {data.social.map((icon) => {
                        let socialIcon
                        switch (icon.icon) {
                          case "facebook":
                            socialIcon = faFacebook
                            break
                          case "instagram":
                            socialIcon = faInstagram
                            break
                          case "pinterest":
                            socialIcon = faPinterest
                            break
                          case "vimeo":
                            socialIcon = faVimeo
                            break
                          default:
                            socialIcon = faTwitter
                        }
                        return (
                          <li key={icon.icon} className="list-inline-item">
                            <a href={icon.link} target="_blank">
                              <FontAwesomeIcon icon={socialIcon} />
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="map-wrapper-300">
        <Map
          className="h-100"
          center={[40.732346, -74.0014247]}
          markerPosition={[40.732346, -74.0014247]}
          zoom={16}
        />
      </div>
    </React.Fragment>
  )
}

export default Contact
