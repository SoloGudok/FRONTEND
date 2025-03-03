import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Badge,
  Overlay,
} from "react-bootstrap"
import UseWindowSize from "../hooks/UseWindowSize"
import Swiper from "../components/Swiper"

import Reviews from "../components/Reviews"
import ReviewForm from "../components/ReviewForm"

import data from "../data/detail-rooms.json"

import SwiperGallery from "../components/SwiperGallery"
import Gallery from "../components/Gallery"
import Map from "../components/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faBath,
  faBed,
  faDoorOpen,
  faHeart,
  faLaptop,
  faLongArrowAltRight,
  faMapMarkerAlt,
  faSnowflake,
  faThermometerThreeQuarters,
  faTshirt,
  faTv,
  faUsers,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons"
import Avatar from "../components/Avatar"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms detail",
    },
  }
}

const DetailRooms = () => {
  const size = UseWindowSize()
  const [range, setRange] = useState({
    from: false,
    to: false,
  })

  const groupByN = (n, data) => {
    let result = []
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n))
    return result
  }

  const groupedAmenities = data.amenities && groupByN(4, data.amenities)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const fromRef = useRef()
  const toRef = useRef()
  useEffect(() => {
    if (range?.from && (!range?.to || range.to !== range.from)) {
      const timer = setTimeout(() => setShowDatePicker(false), 200)
      return () => clearTimeout(timer)
    }
  }, [range])
  return (
    <React.Fragment>
      <section>
        <SwiperGallery data={data.swiper} />
        <Container className="py-5">
          <Row>
            <Col lg="8">
              <div className="text-block">
                <p className="text-primary">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" />
                  &nbsp;{data.location && data.location}
                </p>
                {data.title && <h1>{data.title}</h1>}
                {data.category && (
                  <div className="text-muted text-uppercase mb-4">
                    {data.category}
                  </div>
                )}
                {data.tags && (
                  <ul className="list-inline text-sm mb-4">
                    {data.tags.map((tag) => {
                      let tagIcon
                      switch (tag.icon) {
                        case "door-open":
                          tagIcon = faDoorOpen
                          break
                        case "bed":
                          tagIcon = faBed
                          break
                        case "bath":
                          tagIcon = faBath
                          break
                        default:
                          tagIcon = faUsers
                      }
                      return (
                        <li key={tag.value} className="list-inline-item me-3">
                          <FontAwesomeIcon
                            icon={tagIcon}
                            className="me-1 text-secondary"
                          />

                          {tag.value}
                        </li>
                      )
                    })}
                  </ul>
                )}
                <p className="text-muted fw-light">
                  Our garden basement apartment is fully equipped with
                  everything you need to enjoy your stay. Very comfortable for a
                  couple but plenty of space for a small family. Close to many
                  wonderful Brooklyn attractions and quick trip to Manhattan.{" "}
                </p>
                <h6 className="mb-3">The space</h6>
                <p className="text-muted fw-light">
                  Welcome to Brooklyn! We are excited to share our wonderful
                  neighborhood with you. Our modern apartment has a private
                  entrance, fully equipped kitchen, and a very comfortable queen
                  size bed. We are happy to accommodate additional guests with a
                  single bed in the living room, another comfy mattress on the
                  floor and can make arrangements for small children with a
                  portable crib and highchair if requested.{" "}
                </p>
                <p className="text-muted fw-light">Also in the apartment:</p>
                <ul className="text-muted fw-light">
                  <li>TV with Netflix and DirectTVNow</li>
                  <li>Free WiFi</li>
                  <li>Gourmet Coffee/Tea making supplies</li>
                  <li>Fresh Sheets and Towels</li>
                  <li>
                    Toaster, microwave, pots and pans and basic cooking needs
                    like salt, pepper, sugar, and olive oil.
                  </li>
                  <li>Air Conditioning to keep you cool all summer!</li>
                </ul>
                <p className="text-muted fw-light">
                  The apartment is surprisingly quiet for being in the heart of
                  a vibrant, bustling neighborhood.
                </p>
                <h6 className="mb-3">Interaction with guests</h6>
                <p className="text-muted fw-light">
                  We live in the two floors above the garden apartment so we are
                  usually available to answer questions. The garden apartment is
                  separate from our living space. We are happy to provide advice
                  on local attractions, restaurants and transportation around
                  the city. If there's anything you need please don't hesitate
                  to ask!
                </p>
              </div>
              {data.amenities && (
                <React.Fragment>
                  <div className="text-block">
                    <h4 className="mb-4">Amenities</h4>
                    <Row>
                      {groupedAmenities &&
                        groupedAmenities.map((amenityBlock) => (
                          <Col key={amenityBlock[0].value} md="6">
                            <ul className="list-unstyled text-muted">
                              {amenityBlock.map((amenity) => {
                                let amenityIcon
                                switch (amenity.icon) {
                                  case "tv":
                                    amenityIcon = faTv
                                    break
                                  case "snowflake":
                                    amenityIcon = faSnowflake
                                    break
                                  case "thermometer-three-quarters":
                                    amenityIcon = faThermometerThreeQuarters
                                    break
                                  case "bath":
                                    amenityIcon = faBath
                                    break
                                  case "utensils":
                                    amenityIcon = faUtensils
                                    break
                                  case "laptop":
                                    amenityIcon = faLaptop
                                    break
                                  case "tshirt":
                                    amenityIcon = faTshirt
                                    break
                                  default:
                                    amenityIcon = faWifi
                                }
                                return (
                                  <li key={amenity.value} className="mb-2">
                                    <FontAwesomeIcon
                                      icon={amenityIcon}
                                      className="text-secondary w-1rem me-3 text-center"
                                    />

                                    <span className="text-sm">
                                      {amenity.value}
                                    </span>
                                  </li>
                                )
                              })}
                            </ul>
                          </Col>
                        ))}
                    </Row>
                  </div>
                  <div className="text-block">
                    <h4 className="mb-0">Amenities alternative</h4>
                    <p className="subtitle text-sm text-primary mb-4">
                      Alternative amenities display
                    </p>
                    <ul className="list-inline">
                      {data.amenities.map((amenity) => (
                        <li
                          key={amenity.value}
                          className="list-inline-item mb-2"
                        >
                          <Badge
                            pill
                            bg="light"
                            className="p-3 text-muted fw-normal"
                          >
                            {amenity.value}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              )}
              {data.author && (
                <div className="text-block">
                  <div className="d-flex">
                    <Avatar
                      size="lg"
                      image={`/content/img/avatar/${data.author.avatar}`}
                      className="me-4"
                      border
                      alt={data.author.name}
                    />

                    <div>
                      <p>
                        <span className="text-muted text-uppercase text-sm">
                          Hosted by
                        </span>
                        <br />
                        <strong>{data.author.name}</strong>
                      </p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.author.content,
                        }}
                      />
                      <p className="text-sm">
                        <Link href="/user-profile">
                          <a>
                            See{" "}
                            {data.author.name.split(" ").slice(0, -1).join(" ")}
                            's 3 other listings{" "}
                            <FontAwesomeIcon
                              icon={faLongArrowAltRight}
                              className="ms-2"
                            />
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="text-block">
                <h3 className="mb-4">Location</h3>
                <div className="map-wrapper-300 mb-3">
                  <Map
                    className="h-100"
                    center={[40.732346, -74.0014247]}
                    circlePosition={[40.732346, -74.0014247]}
                    circleRadius={500}
                    zoom={14}
                  />
                </div>
              </div>

              {data.swiper && (
                <div className="text-block">
                  <h3 className="mb-4">Gallery</h3>
                  <Gallery
                    rowClasses="ms-n1 me-n1"
                    lg="4"
                    xs="6"
                    colClasses="px-1 mb-2"
                    data={data.swiper}
                  />
                </div>
              )}
              {data.reviews && <Reviews data={data.reviews} />}
              <ReviewForm />
            </Col>
            <Col lg="4">
              <div
                style={{ top: "100px" }}
                className="p-4 shadow ms-lg-4 rounded sticky-top"
              >
                <p className="text-muted">
                  <span className="text-primary h2">
                    {data.price && data.price}
                  </span>{" "}
                  per night
                </p>
                <hr className="my-4" />
                <Form
                  id="booking-form"
                  method="get"
                  action="#"
                  autoComplete="off"
                  className="form"
                >
                  <div>
                    <Form.Label>Your stay *</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type="text"
                        value={
                          (range?.from &&
                            range?.from?.toLocaleDateString("en-US")) ||
                          ""
                        }
                        onChange={(e) =>
                          setRange({ ...range, from: e.target.value })
                        }
                        placeholder="From"
                        onClick={() => setShowDatePicker(true)}
                        ref={fromRef}
                      />
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="mx-2 text-muted"
                      />
                      <Form.Control
                        type="text"
                        value={
                          (range?.from &&
                            range?.to?.toLocaleDateString("en-US")) ||
                          ""
                        }
                        onChange={(e) =>
                          setRange({ ...range, to: e.target.value })
                        }
                        placeholder="To"
                        onClick={() => setShowDatePicker(true)}
                        ref={toRef}
                      />
                    </div>
                    <Overlay
                      target={toRef.current}
                      rootClose
                      placement="bottom-end"
                      show={showDatePicker}
                      onHide={() => setShowDatePicker(!showDatePicker)}
                    >
                      {({ arrowProps, show: _show, popper, ...props }) => (
                        <div
                          {...props}
                          style={{ ...props.style, zIndex: 1030 }}
                          className={`position-absolute bg-white shadow rounded p-2 z-index-1030`}
                        >
                          <DayPicker
                            mode="range"
                            selected={range}
                            onSelect={(e) => {
                              setRange(e)
                            }}
                            fromYear={2020}
                            toYear={2023}
                            numberOfMonths={size.width > 768 ? 2 : 1}
                            style={{
                              "--rdp-accent-color": "#4e66f8",
                              zIndex: 1030,
                              position: "relative",
                            }}
                          />
                        </div>
                      )}
                    </Overlay>
                  </div>
                  <div className="mb-4">
                    <Form.Label htmlFor="guests">Guests *</Form.Label>
                    <Form.Select name="guests" id="guests">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                    </Form.Select>
                  </div>
                  <div className="d-grid mb-4">
                    <Button type="submit">Book your stay</Button>
                  </div>
                </Form>
                <p className="text-muted text-sm text-center">
                  Some additional text can be also placed here.
                </p>
                <hr className="my-4" />
                <div className="text-center">
                  <p>
                    <a href="#" className="text-secondary text-sm">
                      <FontAwesomeIcon icon={faHeart} />
                      &nbsp;Bookmark This Listing
                    </a>
                  </p>
                  <p className="text-muted text-sm">
                    79 people bookmarked this place{" "}
                  </p>
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
              loop={true}
              roundLengths={true}
              md={2}
              lg={3}
              xl={4}
              data={data.similar.items}
              cards
              pagination
            />
          </Container>
        </section>
      )}
    </React.Fragment>
  )
}

export default DetailRooms
