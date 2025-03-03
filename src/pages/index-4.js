import React from "react"
import Link from "next/link"

import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Tab,
  Form,
  Card,
} from "react-bootstrap"

import Select from "react-select"

import Swiper from "../components/Swiper"
import PopularCities from "../components/PopularCities"
import Discover from "../components/Discover"
import Brands from "../components/Brands"
import Instagram from "../components/Instagram"

import data from "../data/index4.json"
import Image from "../components/CustomImage"
import { Fragment } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Real Estate",
    },
  }
}

const Index4 = () => {
  return (
    <React.Fragment>
      <section className="d-flex align-items-center dark-overlay">
        <Image
          src={data.hero}
          layout="fill"
          className="bg-image"
          alt="Hero image"
          loading="eager"
          priority={true}
        />
        <Container className="py-6 py-lg-7 text-white overlay-content">
          <Row>
            <Col xl="8">
              <h1 className="display-3 fw-bold text-shadow">{data.title}</h1>
              <p className="text-lg text-shadow mb-6">{data.subTitle}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="position-relative mt-n6 z-index-20">
        <Tab.Container
          id="top-tabs"
          defaultActiveKey={data.searchTabs.tabs[0].title}
        >
          <Nav variant="tabs" className="search-bar-nav-tabs">
            {data.searchTabs &&
              data.searchTabs.tabs.map((tab, index) => (
                <Nav.Item
                  key={index}
                  className={
                    index < data.searchTabs.tabs.length - 1 ? "me-2" : ""
                  }
                >
                  <Nav.Link eventKey={tab.title}>{tab.title}</Nav.Link>
                </Nav.Item>
              ))}
          </Nav>
          <div className="search-bar search-bar-with-tabs p-3 p-lg-4">
            <Tab.Content>
              {data.searchTabs &&
                data.searchTabs.tabs.map((tab, index) => (
                  <Tab.Pane eventKey={tab.title} key={index}>
                    <Form>
                      <Row>
                        <Col
                          lg="4"
                          className="d-flex align-items-center form-group no-divider"
                        >
                          <Select
                            instanceId={"locationPicker"}
                            options={data.searchTabs.locationOptions}
                            placeholder="Location"
                            className="selectpicker w-100"
                            classNamePrefix="selectpicker"
                          />
                        </Col>
                        <Col
                          md="6"
                          lg="3"
                          className="d-flex align-items-center form-group no-divider"
                        >
                          <Select
                            instanceId={"typePicker"}
                            options={data.searchTabs.typeOptions}
                            placeholder="Type"
                            className="selectpicker w-100"
                            classNamePrefix="selectpicker"
                          />
                        </Col>
                        <Col
                          md="6"
                          lg="3"
                          className="d-flex align-items-center form-group no-divider"
                        >
                          <Select
                            instanceId={"pricePicker"}
                            options={data.searchTabs.priceOptions}
                            placeholder="Max price"
                            className="selectpicker w-100"
                            classNamePrefix="selectpicker"
                          />
                        </Col>
                        <Col lg="2" className="form-group mb-0 d-grid">
                          <Button className="h-100">Search</Button>
                        </Col>
                      </Row>
                    </Form>
                  </Tab.Pane>
                ))}
            </Tab.Content>
          </div>
        </Tab.Container>
      </Container>
      {data.featured && (
        <section className="py-6">
          <Container>
            <Row className="mb-lg-6">
              <Col md="8">
                <p className="subtitle text-secondary">
                  {data.featured.subTitle}
                </p>
                <h2 className="mb-md-0">{data.featured.title}</h2>
              </Col>
              <Col
                lg="4"
                className="d-md-flex align-items-center justify-content-end"
              >
                <Link href={data.featured.buttonLink}>
                  <a className="text-muted text-sm">
                    {data.featured.button}
                    <FontAwesomeIcon
                      icon={faAngleDoubleRight}
                      className="ms-2"
                    />
                  </a>
                </Link>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Swiper
              className="swiper-container-mx-negative items-slider-full px-lg-5 pt-3 pb-5"
              perView={1}
              spaceBetween={20}
              loop
              roundLengths
              md={2}
              lg={3}
              xl={4}
              xxl={5}
              xxxl={6}
              data={data.featured.swiper}
              propertyCards
              pagination
            />
          </Container>
        </section>
      )}

      {data.popularCities && (
        <PopularCities
          title={data.popularCities.title}
          subTitle={data.popularCities.subTitle}
          greyBackground
        />
      )}

      {data.discover && (
        <Discover
          className="py-6"
          title={data.discover.title}
          subTitle={data.discover.subTitle}
          blocks={data.discover.blocks}
        />
      )}

      {data.divider && (
        <section>
          <Container className="bg-gray-100 py-6 px-3 px-lg-5 rounded-3 shadow-sm">
            <Row>
              <Col lg="6" className="mb-5 mb-lg-0 text-center text-lg-start">
                <p className="subtitle text-secondary">{data.divider.title}</p>
                <p className="text-lg">{data.divider.subTitle}</p>
                <p className="text-muted mb-0">{data.divider.content}</p>
              </Col>
              <Col
                lg="6"
                className="d-flex align-items-center justify-content-center"
              >
                <div className="text-center">
                  <p className="mb-2">
                    <Link href={data.divider.buttonLink} passHref>
                      <Button size="large">{data.divider.button}</Button>
                    </Link>
                  </p>
                  <p className="text-muted text-small">{data.divider.small}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      {data.team && (
        <section className="py-6">
          <Container>
            <Row className="mb-lg-6">
              <Col md="8">
                <p className="subtitle text-secondary">Who are we?</p>
                <h2 className="mb-md-0">Meet our team</h2>
              </Col>
              <Col
                md="4"
                className="d-md-flex align-items-center justify-content-end"
              >
                <Link href={data.team.buttonLink}>
                  <a className="text-muted text-sm">
                    {data.team.button}
                    <FontAwesomeIcon
                      icon={faAngleDoubleRight}
                      className="ms-2"
                    />
                  </a>
                </Link>
              </Col>
            </Row>
            <Row>
              {data.team.members.map((member) => (
                <Col key={member.title} sm="6" lg="3" className="mb-3 mb-lg-0">
                  <Card className="border-0 hover-animate bg-transparent">
                    <Link href={member.link}>
                      <a className="position-relative">
                        <div className="card-img-top team-img">
                          <Image
                            src={`/content/${member.avatar}`}
                            alt=""
                            width={408}
                            height={504}
                            layout="responsive"
                            className="img-fluid"
                            sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, 260px"
                          />
                        </div>
                        <div className="team-circle bg-secondary-light" />
                      </a>
                    </Link>
                    <Card.Body className=" team-body text-center">
                      <Card.Title as="h6">{member.title}</Card.Title>
                      <Card.Subtitle
                        as="p"
                        className="text-muted text-xs text-uppercase"
                      >
                        {member.type}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      {data.brands && (
        <Brands
          title={data.brands.title}
          brands={data.brands.brands}
          greyBackground
        />
      )}
      <Instagram />
    </React.Fragment>
  )
}

export default Index4
