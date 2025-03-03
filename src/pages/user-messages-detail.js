import React from "react"
import Link from "next/link"

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Breadcrumb,
  InputGroup,
} from "react-bootstrap"

import data from "../data/user-messages-detail.json"
import Stars from "../components/Stars"
import Image from "../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faArrowRight,
  faPaperPlane,
  faUsers,
} from "@fortawesome/free-solid-svg-icons"
import Avatar from "../components/Avatar"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      loggedUser: true,
      title: "Personal info - User Messages Detail",
    },
  }
}

const UserInvoice = () => {
  return (
    <section className="py-5">
      <Container>
        <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
          <Link href="/" passHref>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Link>
          <Link href="/user-messages" passHref>
            <Breadcrumb.Item>Inbox</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item active>Your messages with Anna</Breadcrumb.Item>
        </Breadcrumb>

        <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-4">
          <h1 className="mb-3 mb-md-0 hero-heading mb-0">
            Your messages with Anna
          </h1>
          <div>
            <Link passHref href="/user-messages">
              <Button variant="link" className="ps-0">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back to
                all messages
              </Button>
            </Link>
          </div>
        </div>
        <Card className="border-0 shadow mb-4">
          <Card.Body className="p-4">
            <div className="text-block pb-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6>
                    <Link href="/detail-rooms">
                      <a className="text-reset">
                        Modern Apt - Vibrant Neighborhood
                      </a>
                    </Link>
                  </h6>
                  <p className="text-muted text-sm mb-0">
                    Entire home in New York
                  </p>
                  <div className="mt-n1">
                    <Stars color="text-primary" size="xs" stars="3" />
                  </div>
                </div>
                <Link href="/detail-rooms">
                  <a className="ms-3">
                    <Image
                      src="/content/img/photo/photo-1512917774080-9991f1c4c750.jpg"
                      alt=""
                      width={100}
                      height={67}
                      layout="fixed"
                      className="rounded"
                      sizes="(max-width: 576px) 100vw, 530px"
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="text-block pt-3 pb-0">
              <ul className="list-unstyled text-sm mb-0">
                <li className="mb-3">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="fa-fw text-muted me-2"
                  />
                  3 guests
                </li>
                <li className="mb-0">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className="fa-fw text-muted me-2"
                  />
                  Apr 17, 2019{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="fa-fw text-muted mx-3"
                  />
                  Apr 18, 2019
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
        <div className="px-4 py-5">
          <Row>
            {data.map((message, index) => (
              // If message has attribute me, message is aligned to right and has different background
              <Col
                key={index}
                md="9"
                xl="7"
                className={`d-flex mb-3 ${message.me ? "ms-auto" : ""}`}
              >
                {!message.me && (
                  <Avatar
                    image={message.image}
                    alt="user"
                    className="avatar-border-white"
                    cover
                  />
                )}
                <div className={message.me ? "me-3" : "ms-3"}>
                  <div
                    className={`${
                      message.me ? "bg-primary" : "bg-gray-200"
                    } rounded p-4 mb-2`}
                  >
                    <p
                      className={`${
                        message.me ? "text-white" : ""
                      } text-sm mb-0`}
                    >
                      {message.content}
                    </p>
                  </div>
                  <p className="small text-muted ms-3">{message.date}</p>
                </div>
                {message.me && (
                  <Avatar
                    image={message.image}
                    alt="user"
                    className="avatar-border-white"
                    cover
                  />
                )}
              </Col>
            ))}
          </Row>
        </div>
        <Form className="bg-light rounded shadow-sm" action="#">
          <InputGroup>
            <Form.Control
              type="textarea"
              className="border-0 p-4 bg-light text-sm"
              placeholder="Type a message"
              aria-describedby="button-sendMessage"
            />

            <Button variant="link" id="button-sendMessage" type="submit">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </InputGroup>
        </Form>
      </Container>
    </section>
  )
}

export default UserInvoice
