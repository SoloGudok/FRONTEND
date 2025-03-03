import React, { useEffect, useRef, useState } from "react"

import UseWindowSize from "../hooks/UseWindowSize"

import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import Select from "react-select"

import {
  Container,
  Row,
  Col,
  Form,
  Collapse,
  Button,
  Popover,
  Overlay,
} from "react-bootstrap"

import Nouislider from "nouislider-react"
import Pagination from "../components/Pagination"
import Map from "../components/Map"

import ResultsTopBar from "../components/ResultsTopBar"
import CardRoom from "../components/CardRoom"

import data from "../data/category-2-rooms.json"
import geoJSON from "../data/rooms-geojson.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faArrowRight } from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Rooms | Category - Map on the top",
    },
  }
}

const Category2Rooms = () => {
  const size = UseWindowSize()
  const [range, setRange] = useState({
    from: false,
    to: false,
  })

  const [filterCollapse, setFilterCollapse] = useState(false)

  const [priceMin, setPriceMin] = useState(40)
  const [priceMax, setPriceMax] = useState(110)

  const [beds, setBeds] = useState(1)
  const [bedrooms, setBedrooms] = useState(1)
  const [bathrooms, setBathrooms] = useState(1)

  const priceSlider = (render, handle, value, un, percent) => {
    setPriceMin(value[0].toFixed(0))
    setPriceMax(value[1].toFixed(0))
  }

  const [hoverCard, setHoverCard] = useState(null)
  const onCardEnter = (id) => {
    setHoverCard(id)
  }
  const onCardLeave = () => {
    setHoverCard(null)
  }

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
      <Container fluid>
        <Row>
          <Col lg="6" className="py-4 p-xl-5">
            <h2 className="mb-4">{data.title && data.title}</h2>
            <hr className="my-4" />
            <Form>
              <Row>
                <Col md="6" className="mb-4 z-index-20">
                  <Form.Label htmlFor="form_dates">Dates</Form.Label>
                  <br />
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
                    target={fromRef.current}
                    rootClose
                    placement="bottom-start"
                    show={showDatePicker}
                    onHide={() => setShowDatePicker(!showDatePicker)}
                  >
                    {({ arrowProps, show: _show, popper, ...props }) => (
                      <div
                        {...props}
                        className={`position-absolute bg-white shadow rounded p-2 z-index-20 `}
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
                          style={{ "--rdp-accent-color": "#4e66f8" }}
                        />
                      </div>
                    )}
                  </Overlay>
                </Col>
                <Col md="6" className="mb-4">
                  <Form.Label htmlFor="form_guests">Guests</Form.Label>
                  <Select
                    inputId="form_guests"
                    name="guests"
                    options={data.guests && data.guests}
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                  />
                </Col>
                <Col md="6" lg="12" className="mb-4">
                  <Form.Label htmlFor="form_type">Home type</Form.Label>
                  <Select
                    instanceId="typeSelect"
                    inputId="form_type"
                    name="type"
                    id="form_type"
                    options={data.type && data.type}
                    isMulti
                    className=""
                    classNamePrefix="selectpicker"
                  />
                </Col>
                <Col md="6" xl="4" className="mb-4">
                  <Form.Label>Price range</Form.Label>
                  <Nouislider
                    range={{ min: 40, max: 110 }}
                    start={[40, 110]}
                    onUpdate={priceSlider}
                    className="text-primary"
                    connect
                  />
                  <div className="nouislider-values">
                    <div className="min">
                      From $<span id="slider-snap-value-from">{priceMin}</span>
                    </div>
                    <div className="max">
                      To $<span id="slider-snap-value-to">{priceMax}</span>
                    </div>
                  </div>
                </Col>
                <Col
                  md="6"
                  lg="12"
                  xl="8"
                  className="mb-4 d-xl-flex justify-content-center"
                >
                  <div>
                    <Form.Label>Host and booking</Form.Label>
                    <ul className="list-inline mb-0 mt-1">
                      <li className="list-inline-item">
                        <Form.Check
                          id="instantBook"
                          type="switch"
                          label={<span className="text-sm">Instant book</span>}
                        />
                      </li>
                      <li className="list-inline-item">
                        <Form.Check
                          id="superhost"
                          type="switch"
                          label={<span className="text-sm">Superhost</span>}
                        />
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col xs="12" className="pb-4">
                  <Collapse in={filterCollapse}>
                    <div>
                      <div className="filter-block">
                        <h6 className="mb-3">Location</h6>
                        <Row>
                          <Col xl="4" md="6" className="mb-4 mb-xl-0">
                            <Form.Label htmlFor="form_neighbourhood">
                              Neighbourhood
                            </Form.Label>
                            <Select
                              instanceId="neighbourhoodSelect"
                              name="neighbourhood"
                              inputId="form_neighbourhood"
                              options={data.neighbourhood && data.neighbourhood}
                              isMulti
                              isSearchable
                              className="form-control dropdown bootstrap-select"
                              classNamePrefix="selectpicker"
                            />
                          </Col>
                          {data.tags && (
                            <Col xl="8">
                              <Form.Label>{data.tags.title}</Form.Label>
                              <ul className="list-inline mt-xl-1 mb-0">
                                {data.tags.items.map((tag) => (
                                  <li
                                    key={tag.value}
                                    className="list-inline-item"
                                  >
                                    <Form.Check
                                      type="checkbox"
                                      id={tag.value}
                                      name={tag.value}
                                      label={tag.label}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </Col>
                          )}
                        </Row>
                      </div>
                      <div className="filter-block">
                        <h6 className="mb-3">Rooms and beds</h6>
                        <Row>
                          <Col lg="4">
                            <Form.Label className="form-label">Beds</Form.Label>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="items"
                                className="btn-items-decrease"
                                onClick={() => beds > 1 && setBeds(beds - 1)}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="text"
                                value={`${beds}+`}
                                disabled
                                className="input-items input-items-greaterthan"
                              />
                              <Button
                                variant="items"
                                className="btn-items-increase"
                                onClick={() => setBeds(beds + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </Col>
                          <Col lg="4">
                            <Form.Label className="form-label">
                              Bedrooms
                            </Form.Label>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="items"
                                className="btn-items-decrease"
                                onClick={() =>
                                  bedrooms > 1 && setBedrooms(bedrooms - 1)
                                }
                              >
                                -
                              </Button>
                              <Form.Control
                                type="text"
                                value={`${bedrooms}+`}
                                disabled
                                className="input-items input-items-greaterthan"
                              />
                              <Button
                                variant="items"
                                className="btn-items-increase"
                                onClick={() => setBedrooms(bedrooms + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </Col>
                          <Col lg="4">
                            <Form.Label>Bathrooms</Form.Label>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="items"
                                className="btn-items-decrease"
                                onClick={() =>
                                  bathrooms > 1 && setBathrooms(bathrooms - 1)
                                }
                              >
                                -
                              </Button>
                              <Form.Control
                                type="text"
                                value={`${bathrooms}+`}
                                disabled
                                className="input-items input-items-greaterthan"
                              />
                              <Button
                                variant="items"
                                className="btn-items-increase"
                                onClick={() => setBathrooms(bathrooms + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="filter-block">
                        <h6 className="mb-3">Trip type</h6>
                        <Row className="pt-1">
                          <Col sm="6">
                            <Form.Check
                              id="forfamilies"
                              type="switch"
                              name="forfamilies"
                              aria-describedby="forfamiliesHelp"
                              className="mb-3"
                              label={
                                <span className="text-sm">For Families</span>
                              }
                            />
                            <small
                              id="forfamiliesHelp"
                              className="text-muted form-text"
                            >
                              Explore entire homes with 5-star reviews from
                              families and essentials like a kitchen and TV
                            </small>
                          </Col>
                          <Col sm="6">
                            <Form.Check
                              id="forwork"
                              type="switch"
                              name="forwork"
                              aria-describedby="forworkHelp"
                              className="mb-3"
                              label={<span className="text-sm">For work</span>}
                            />
                            <small
                              id="forworkHelp"
                              className="text-muted form-text"
                            >
                              Explore top-rated homes with essentials like a
                              workspace, wifi, and self check-in
                            </small>
                          </Col>
                        </Row>
                      </div>
                      {data.amenities && (
                        <div className="filter-block">
                          <h6 className="mb-3">{data.amenities.title}</h6>

                          <ul className="list-inline mb-0">
                            {data.amenities.items.map((amenity) => (
                              <li
                                key={amenity.value}
                                className="list-inline-item"
                              >
                                <Form.Check
                                  type="checkbox"
                                  id={amenity.value}
                                  name={amenity.value}
                                  label={amenity.label}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {data.facilities && (
                        <div className="filter-block">
                          <h6 className="mb-3">{data.facilities.title}</h6>
                          <ul className="list-inline mb-0">
                            {data.facilities.items.map((facility) => (
                              <li
                                key={facility.value}
                                className="list-inline-item"
                              >
                                <Form.Check
                                  type="checkbox"
                                  id={facility.value}
                                  name={facility.value}
                                  label={facility.label}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Collapse>
                </Col>
              </Row>
              <Row>
                <Col sm="6" className="mb-4 order-2 order-sm-1">
                  <Button type="submit">
                    <FontAwesomeIcon icon={faSearch} className="me-1" />
                    Search
                  </Button>
                </Col>
                <Col sm="6" className="mb-4 text-sm-end order-1 order-sm-2">
                  <Button
                    aria-expanded={filterCollapse}
                    onClick={() => setFilterCollapse(!filterCollapse)}
                    variant="link"
                    className="btn-collapse ps-0 text-secondary"
                  >
                    {filterCollapse ? "Less filters" : "More filters"}
                  </Button>
                </Col>
              </Row>
            </Form>
            <hr className="my-4" />
            <ResultsTopBar sortBy={data.sortby} />
            <Row>
              {geoJSON.features &&
                geoJSON.features.map((room) => (
                  <Col
                    key={room.properties.name}
                    sm="6"
                    className="mb-5 hover-animate"
                    onMouseEnter={() => onCardEnter(room.properties.id)}
                    onMouseLeave={() => onCardLeave()}
                  >
                    <CardRoom
                      data={room.properties}
                      sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, calc(25vw - 60px)"
                    />
                  </Col>
                ))}
            </Row>
            <Pagination />
          </Col>
          <Col lg="6" className="map-side-lg pe-lg-0">
            <Map
              className="map-full shadow-left"
              center={[51.505, -0.09]}
              zoom={14}
              geoJSON={geoJSON}
              hoverCard={hoverCard}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Category2Rooms
