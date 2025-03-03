import React from "react"
import Link from "next/link"

import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  Breadcrumb,
} from "react-bootstrap"

import data from "../data/user-booking-detail.json"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      loggedUser: true,
      title: "Booking detail",
    },
  }
}

import Swiper from "../components/Swiper"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPrint,
  faCat,
  faChild,
  faGlassCheers,
  faSmokingBan,
} from "@fortawesome/free-solid-svg-icons"
import { faFile } from "@fortawesome/free-regular-svg-icons"
import Avatar from "../components/Avatar"

const UserBookingDetail = () => {
  const [rulesCollapse, setRulesCollapse] = React.useState(false)

  const splitRulesBy = (n, data) => {
    let result = []
    result.push(data.slice(0, n))
    result.push(data.slice(n, data.length))
    return result
  }

  const splitedRules = splitRulesBy(4, data.rules)
  return (
    <Container fluid>
      <Row>
        <Col lg="7" xl="5" className="px-4 pb-4 ps-xl-5 pe-xl-5">
          <section className="mx-n4 mx-xl-n5 mb-4 mb-xl-5">
            <Swiper
              className="booking-detail-slider"
              perView={2}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              data={data.swiper}
              gallery={true}
              paginationClass="swiper-pagination-white"
              navigation={true}
            />
          </section>
          <Breadcrumb listProps={{ className: "ps-0 justify-content-start" }}>
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/user-grid" passHref>
              <Breadcrumb.Item>Your trips</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Trip to London</Breadcrumb.Item>
          </Breadcrumb>

          <div className="text-block">
            <p className="subtitle">{data.date}</p>
            <h1 className="hero-heading mb-3">{data.title}</h1>
          </div>
          <div className="text-block">
            <h6 className="mb-4">{data.stay.title}</h6>
            <Row className="mb-3">
              <Col md="6" className="d-flex align-items-center mb-3 mb-md-0">
                <div className="date-tile me-3">
                  <div className="text-uppercase">
                    <span className="text-sm">
                      {data.stay.from.month.substring(0, 3)}
                    </span>
                    <br />
                    <strong className="text-lg">{data.stay.from.day}</strong>
                  </div>
                </div>
                <p className="text-sm mb-0">
                  {data.stay.checkin.title}
                  <br />
                  {data.stay.checkin.content}
                </p>
              </Col>
              <Col md="6" className="d-flex align-items-center">
                <div className="date-tile me-3">
                  <div className="text-uppercase">
                    <span className="text-sm">
                      {data.stay.to.month.substring(0, 3)}
                    </span>
                    <br />
                    <strong className="text-lg">{data.stay.to.day}</strong>
                  </div>
                </div>
                <p className="text-sm mb-0">
                  {data.stay.checkout.title}
                  <br />
                  {data.stay.checkout.content}
                </p>
              </Col>
            </Row>
          </div>
          <div className="text-block">
            <Row>
              <Col xs="sm">
                <h6>Address</h6>
                <p className="text-muted">{data.address}</p>
              </Col>

              <Col xs="sm">
                <h6>Phone</h6>
                <p className="text-muted">{data.phone}</p>
              </Col>
            </Row>
          </div>
          <div className="text-block">
            <div className="d-flex align-items-center mb-3">
              <div>
                <h6>{data.type}</h6>
                <p className="text-muted mb-0">
                  Hosted by
                  <Link href="/user-profile">
                    <a className="text-reset">{data.owner.name}</a>
                  </Link>
                </p>
              </div>
              <Link href="/user-profile">
                <a>
                  <Avatar
                    image={`/content/img/avatar/${data.owner.avatar}`}
                    alt={data.owner.name}
                    className="ms-4 avatar-border-white"
                    cover
                    size="lg"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="text-block">
            <h6 className="mb-3">Who's coming</h6>
            <Row className="mb-3">
              {data.members.map((member, index) => (
                <Col key={index} xs="auto" className="text-center text-sm">
                  <Avatar
                    image={`/content/img/avatar/${member.avatar}`}
                    alt={member.name}
                    className="mb-1 avatar-border-white"
                    cover
                  />

                  <br />
                  {member.name}
                </Col>
              ))}
            </Row>
          </div>
          <div className="text-block">
            <Row>
              <Col>
                <h6> Total cost</h6>
                <p className="text-muted">{data.cost}</p>
              </Col>
              <Col className="col align-self-center">
                <p className="text-end d-print-none">
                  <Button variant="link" href="#" className="text-muted">
                    <FontAwesomeIcon icon={faFile} className="me-2" />
                    Your invoice
                  </Button>
                </p>
              </Col>
            </Row>
          </div>
          <div className="text-block">
            <h6 className="mb-4">Things to keep in mind</h6>

            <ul className="list-unstyled">
              {splitedRules[0].map((item, index) => {
                let itemIcon
                switch (item.icon) {
                  case "glass-cheers":
                    itemIcon = faGlassCheers
                    break
                  case "smoking-ban":
                    itemIcon = faSmokingBan
                    break
                  case "cat":
                    itemIcon = faCat
                    break
                  default:
                    itemIcon = faChild
                }
                return (
                  <li className="mb-2" key={index}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="icon-rounded icon-rounded-sm bg-secondary-light me-4 flex-shrink-0">
                        <FontAwesomeIcon
                          icon={itemIcon}
                          className="text-secondary fa-fw text-center"
                        />
                      </div>
                      <div>
                        <span className="text-sm">{item.content}</span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            {splitedRules[1] && (
              <React.Fragment>
                <Collapse in={rulesCollapse}>
                  <ul className="list-unstyled">
                    {splitedRules[1].map((item, index) => {
                      let itemIcon
                      switch (item.icon) {
                        case "glass-cheers":
                          itemIcon = faGlassCheers
                          break
                        case "smoking-ban":
                          itemIcon = faSmokingBan
                          break
                        case "cat":
                          itemIcon = faCat
                          break
                        default:
                          itemIcon = faChild
                      }
                      return (
                        <li className="mb-2" key={index}>
                          <div className="d-flex align-items-center mb-3">
                            <div className="icon-rounded icon-rounded-sm bg-secondary-light me-4 flex-shrink-0">
                              <FontAwesomeIcon
                                icon={itemIcon}
                                className="text-secondary fa-fw text-center"
                              />
                            </div>
                            <div>
                              <span className="text-sm">{item.content}</span>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </Collapse>
                <Button
                  variant="link"
                  aria-expanded={rulesCollapse}
                  onClick={() => setRulesCollapse(!rulesCollapse)}
                  className="btn-collapse ps-0 text-muted"
                >
                  {rulesCollapse ? "Show less" : "Show more"}
                </Button>
              </React.Fragment>
            )}
          </div>

          <div className="text-block d-print-none">
            <Button
              variant="link"
              onClick={() => window.print()}
              className="ps-0"
            >
              <FontAwesomeIcon icon={faPrint} className="me-2" />
              Print
            </Button>
          </div>
        </Col>
        <Col lg="5" xl="7" className="map-side-lg px-lg-0">
          <Map
            className="map-full shadow-left"
            center={[40.732346, -74.0014247]}
            markerPosition={[40.732346, -74.0014247]}
            zoom={18}
            scrollWheelZoom={false}
            geoJSON={false}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default UserBookingDetail
