import React from "react"
import Link from "next/link"

import { Container, Row, Col, Card, Breadcrumb } from "react-bootstrap"

import data from "../data/user-grid.json"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      loggedUser: true,
      title: "Booking - grid view",
    },
  }
}

import Stars from "../components/Stars"
import Image from "../components/CustomImage"

const UserGrid = () => {
  return (
    <section className="py-5">
      <Container>
        <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
          <Link href="/" passHref>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item active>Your trips</Breadcrumb.Item>
        </Breadcrumb>

        <h1 className="hero-heading mb-4">{data.title}</h1>
        <p className="text-muted mb-5">{data.content}</p>
        <div className="mb-6">
          <Image
            src="/content/img/illustration/undraw_trip_dv9f.svg"
            width={400}
            height={278}
            layout="intrinsic"
            alt=""
            className="img-fluid"
          />
        </div>
        <h2 className="mb-5">Your past bookings</h2>
        <Row>
          {data.bookings.map((booking) => (
            <Col xl="3" md="4" sm="6" className="mb-5" key={booking.title}>
              <Card className="h-100 border-0 shadow">
                <div className="card-img-top overflow-hidden">
                  <Link href={booking.link}>
                    <a>
                      <Image
                        src={`/content/img/photo/${booking.img}`}
                        width={1350}
                        height={900}
                        layout="responsive"
                        alt={booking.title}
                        className="img-fluid"
                        sizes="(max-width: 576px) 100vw, 530px"
                      />
                    </a>
                  </Link>
                </div>
                <Card.Body className="d-flex align-items-center">
                  <div className="w-100">
                    <p className="subtitle fw-normal text-sm mb-2">
                      {booking.date}
                    </p>
                    <h6 className="card-title">
                      <Link href={booking.link}>
                        <a className="text-decoration-none text-dark">
                          {booking.title}
                        </a>
                      </Link>
                    </h6>
                    <Card.Subtitle className="d-flex mb-3">
                      <p className="flex-grow-1 mb-0 text-muted text-sm">
                        {booking.type}
                      </p>
                      <p className="flex-shrink-1 mb-0 card-stars text-xs text-end">
                        <Stars stars={booking.stars} />
                      </p>
                    </Card.Subtitle>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default UserGrid
