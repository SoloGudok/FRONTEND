import React from "react"
import Link from "next/link"

import { Container, Row, Col, Card } from "react-bootstrap"

import data from "../data/popular_cities.json"
import Image from "./CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

const PopularCities = (props) => {
  return (
    <section className={`py-6 ${props.greyBackground ? "bg-gray-100" : ""}`}>
      <Container>
        <Row className="mb-5">
          <Col md="8">
            <p className="subtitle text-primary">{props.subTitle}</p>
            <h2>{props.title}</h2>
          </Col>
          <Col
            md="4"
            className="d-md-flex align-items-center justify-content-end"
          >
            {data.buttonLink && (
              <Link href={data.buttonLink}>
                <a className="text-muted text-sm">
                  {data.button}
                  <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-2" />
                </a>
              </Link>
            )}
          </Col>
        </Row>
        <Row>
          {data.cities &&
            data.cities.map((city, index) => (
              <Col
                key={index}
                lg={index === 0 ? "8" : "4"}
                className="d-flex align-items-lg-stretch mb-4"
              >
                <Card className="shadow-lg border-0 w-100 border-0 hover-animate overflow-hidden">
                  <Image
                    src={`/content/${city.img}`}
                    layout="fill"
                    alt="Card image"
                    className="bg-image"
                  />
                  <Link href={city.link}>
                    <a className="tile-link" />
                  </Link>
                  <div className="d-flex align-items-center h-100 text-white justify-content-center py-6 py-lg-7 position-relative">
                    <h3 className="text-shadow text-uppercase mb-0">
                      {city.title}
                    </h3>
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </section>
  )
}

export default PopularCities
