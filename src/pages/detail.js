import React from "react"
import Link from "next/link"

import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Table,
  Badge,
} from "react-bootstrap"

import Swiper from "../components/Swiper"

import Stars from "../components/Stars"
import Reviews from "../components/Reviews"
import ReviewForm from "../components/ReviewForm"
import Gallery from "../components/Gallery"

import data from "../data/detail.json"
import geoJSON from "../data/restaurants-geojson.json"
import Image from "../components/CustomImage"
import Icon from "../components/Icon"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCheck,
  faEnvelope,
  faGlobe,
  faHeart,
  faMapMarkerAlt,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons"
import {
  faFacebook,
  faGooglePlus,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Restaurant detail",
    },
  }
}

const Detail = () => {
  const [reviewCollapse, setReviewCollapse] = React.useState(false)

  return (
    <React.Fragment>
      <section className="pt-7 pb-5 d-flex align-items-end dark-overlay">
        <Image
          src={`/content/img/photo/${data.img}`}
          layout="fill"
          className="bg-image"
          alt="Hero image"
          loading="eager"
          priority={true}
        />
        <Container className="overlay-content">
          <div className="d-flex justify-content-between align-items-start flex-column flex-lg-row align-items-lg-end">
            <div className="text-white mb-4 mb-lg-0">
              {data.category && (
                <Badge pill bg="transparent" className="px-3 py-2 mb-4">
                  {data.category}
                </Badge>
              )}
              {data.title && (
                <h1 className="text-shadow verified">{data.title}</h1>
              )}
              {data.location && (
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                  {data.location}
                </p>
              )}

              <p className="mb-0 d-flex align-items-center">
                {data.stars && (
                  <Stars stars={data.stars} size="xs" color="text-primary" />
                )}
                {data.reviewsNumber && (
                  <span className="ms-4">
                    {data.reviewsNumber + " Reviews"}
                  </span>
                )}
              </p>
            </div>
            <div className="calltoactions">
              <Button
                href="#leaveReview"
                onClick={() => setReviewCollapse(!reviewCollapse)}
                data-smooth-scroll
              >
                Leave a Review
              </Button>
            </div>
          </div>
        </Container>
      </section>
      <section className="py-6">
        <Container>
          <Row>
            <Col lg="8">
              <div className="text-block">
                <h3 className="mb-3">About</h3>
                {data.content1 && <p className="text-muted">{data.content1}</p>}
                {data.content2 && <p className="text-muted">{data.content2}</p>}
              </div>
              <div className="text-block">
                <h3 className="mb-4">Location</h3>
                <div className="map-wrapper-300 mb-3">
                  <Map
                    className="h-100"
                    center={[40.732346, -74.0014247]}
                    markerPosition={[40.732346, -74.0014247]}
                    zoom={16}
                  />
                </div>
              </div>
              {data.gallery && (
                <div className="text-block">
                  <h3 className="mb-4">Gallery</h3>
                  <Gallery
                    rowClasses="ms-n1 me-n1"
                    lg="4"
                    xs="6"
                    colClasses="px-1 mb-2"
                    data={data.gallery}
                  />
                </div>
              )}
              {data.amenities && (
                <div className="text-block">
                  <h3 className="mb-4">Amenities</h3>
                  <ul className="amenities-list list-inline">
                    {data.amenities.map((amenity) => (
                      <li key={amenity} className="list-inline-item mb-3">
                        <div className="d-flex align-items-center">
                          <div className="icon-circle bg-secondary me-2">
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                          <span>{amenity}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.reviews && <Reviews data={data.reviews} />}
              <ReviewForm />
            </Col>
            <Col lg="4">
              <div className="ps-xl-4">
                {data.openingHours && (
                  <Card className="border-0 shadow mb-5">
                    <Card.Header className="bg-gray-100 py-4 border-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="subtitle text-sm text-primary">
                            Opening in 5 minutes
                          </p>
                          <h4 className="mb-0">Opening Hours </h4>
                        </div>
                        <Icon
                          icon="wall-clock-1"
                          className="svg-icon-light w-3rem h-3rem ms-3 text-muted"
                        />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <Table className="text-sm mb-0">
                        <tbody>
                          {data.openingHours.map((item, index) => (
                            <tr key={item.day}>
                              <th
                                className={`ps-0 ${
                                  index === 0 ? "border-0" : ""
                                }`}
                              >
                                {item.day}
                              </th>
                              <td
                                className={`pe-0 text-end ${
                                  index === 0 ? "border-0" : ""
                                }`}
                              >
                                {item.hours}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                )}
                {data.contacts && (
                  <Card className="border-0 shadow mb-5">
                    <Card.Header className="bg-gray-100 py-4 border-0">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="subtitle text-sm text-primary">
                            Drop Us a Line
                          </p>
                          <h4 className="mb-0">Contact</h4>
                        </div>
                        <Icon
                          icon="fountain-pen-1"
                          className="svg-icon-light w-3rem h-3rem ms-3 text-muted"
                        />
                      </div>
                    </Card.Header>
                    <Card.Body>
                      <ul className="list-unstyled mb-4">
                        {data.contacts.map((contact) => {
                          let contactIcon
                          switch (contact.icon) {
                            case "envelope":
                              contactIcon = faEnvelope
                              break
                            case "globe":
                              contactIcon = faGlobe
                              break
                            case "facebook":
                              contactIcon = faFacebook
                              break
                            case "twitter":
                              contactIcon = faTwitter
                              break
                            case "instagram":
                              contactIcon = faInstagram
                              break
                            case "google-plus":
                              contactIcon = faGooglePlus
                              break
                            default:
                              contactIcon = faPhone
                          }
                          return (
                            <li key={contact.icon} className="mb-2">
                              <Link href={contact.link}>
                                <a className="text-gray-500 text-sm text-decoration-none">
                                  <FontAwesomeIcon
                                    icon={contactIcon}
                                    className="me-3"
                                  />
                                  <span className="text-muted">
                                    {contact.content}
                                  </span>
                                </a>
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="text-center">
                        <Button href="#" variant="outline-primary">
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="me-2"
                          />
                          Send a Message
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                )}
                <div className="text-center">
                  <p>
                    <a href="#" className="text-secondary">
                      <FontAwesomeIcon icon={faHeart} /> Bookmark This Listing
                    </a>
                  </p>
                  <span>79 people bookmarked this place </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {data.similar && (
        <section className="py-6 bg-gray-100">
          <Container>
            <h5 className="mb-0">{data.similar.title}</h5>
            <p className="subtitle text-sm text-primary mb-4">
              {data.similar.subtitle}
            </p>
            <Swiper
              className="swiper-container-mx-negative items-slider pb-5"
              perView={1}
              spaceBetween={20}
              loop
              roundLengths
              md={2}
              lg={3}
              xl={4}
              data={geoJSON.features}
              restaurantCards
            />
          </Container>
        </section>
      )}
    </React.Fragment>
  )
}

export default Detail
