import React from "react"

import { Container, Row, Col, Form, Collapse, Button } from "react-bootstrap"

import Select from "react-select"

import CardRestaurant from "../components/CardRestaurant"
import ResultsTopBar from "../components/ResultsTopBar"
import Nouislider from "nouislider-react"
import Pagination from "../components/Pagination"
import Map from "../components/Map"

import data from "../data/category2.json"
import geoJSON from "../data/restaurants-geojson.json"
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Restaurants | Category - Map on the right",
    },
  }
}

const Category2 = () => {
  const [filterCollapse, setFilterCollapse] = React.useState(false)

  const [priceMin, setPriceMin] = React.useState(40)
  const [priceMax, setPriceMax] = React.useState(110)

  const priceSlider = (render, handle, value, un, percent) => {
    setPriceMin(value[0].toFixed(0))
    setPriceMax(value[1].toFixed(0))
  }

  const [hoverCard, setHoverCard] = React.useState(null)
  const onCardEnter = (id) => {
    setHoverCard(id)
  }
  const onCardLeave = () => {
    setHoverCard(null)
  }
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col lg="6" className="py-5 p-xl-5">
            <h1 className="text-serif mb-4">{data.title}</h1>
            <hr className="my-4" />
            <Form>
              <Row>
                <Col md="6" xl="4" className="mb-4">
                  <Form.Label htmlFor="form_search">Keyword</Form.Label>
                  <div className="input-label-absolute input-label-absolute-right">
                    <div className="label-absolute">
                      <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <Form.Control
                      type="search"
                      name="search"
                      id="form-search"
                      className="pe-4"
                      placeholder="Keywords"
                    />
                  </div>
                </Col>

                <Col md="6" xl="4" className="mb-4">
                  <Form.Label
                    htmlFor="form_neighbourhood"
                    className="form-label"
                  >
                    Neighbourhood
                  </Form.Label>

                  <Select
                    name="neighbourhood"
                    inputId="form_neighbourhood"
                    options={data.neighbourhood}
                    isMulti
                    isSearchable
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                  />
                </Col>
                <Col md="6" xl="4" className="mb-4">
                  <Form.Label htmlFor="form_category" className="form-label">
                    Category
                  </Form.Label>

                  <Select
                    name="category"
                    inputId="form_category"
                    options={data.categories}
                    className="form-control dropdown bootstrap-select"
                    classNamePrefix="selectpicker"
                  />
                </Col>
                {data.tags && (
                  <Col xs="12" className="mb-4">
                    <Form.Label className="form-label">
                      {data.tags.title}
                    </Form.Label>
                    <ul className="list-inline mb-0">
                      {data.tags.items.map((tag) => (
                        <li key={tag.value} className="list-inline-item">
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
                <Col xs="12" className="pb-4">
                  <Collapse in={filterCollapse}>
                    <div>
                      {data.cuisine && (
                        <div className="mb-4">
                          <Form.Label className="form-label">
                            {data.cuisine.title}
                          </Form.Label>
                          <ul className="list-inline mb-0">
                            {data.cuisine.items.map((tag) => (
                              <li key={tag.value} className="list-inline-item">
                                <Form.Check
                                  type="checkbox"
                                  id={tag.value}
                                  name={tag.value}
                                  label={tag.label}
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <Row>
                        <Col xl="6" className="mb-4">
                          <Form.Label className="form-label">Price</Form.Label>

                          <Nouislider
                            range={{ min: 40, max: 110 }}
                            start={[40, 110]}
                            onUpdate={priceSlider}
                            className="text-primary"
                            connect
                          />
                          <div className="nouislider-values">
                            <div className="min">
                              From $
                              <span id="slider-snap-value-from">
                                {priceMin}
                              </span>
                            </div>
                            <div className="max">
                              To $
                              <span id="slider-snap-value-to">{priceMax}</span>
                            </div>
                          </div>
                        </Col>
                        <Col xl="6" className="mb-4">
                          <Form.Label className="form-label">
                            Vegetarians
                          </Form.Label>
                          <ul className="list-inline mb-0">
                            <li className="list-inline-item">
                              <Form.Check
                                type="radio"
                                id="vegetarians_0"
                                name="vegetarians"
                                label="All"
                              />
                            </li>
                            <li className="list-inline-item">
                              <Form.Check
                                type="radio"
                                id="vegetarians_1"
                                name="vegetarians"
                                label="Vegetarian only"
                              />
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>
                  </Collapse>
                </Col>
                <Col xs="6" className="mb-4">
                  <Button type="submit">
                    <FontAwesomeIcon icon={faFilter} className="me-1" />
                    Filter
                  </Button>
                </Col>
                <Col xs="6" className="mb-4 text-end">
                  <Button
                    aria-expanded={filterCollapse}
                    variant="link"
                    className="ps-0 text-secondary btn-collapse"
                    onClick={() => setFilterCollapse(!filterCollapse)}
                  >
                    {filterCollapse ? "Less filters" : "More filters"}
                  </Button>
                </Col>
              </Row>
            </Form>
            <hr className="my-4" />
            <ResultsTopBar sortBy={data.sortby} />
            {geoJSON.features && (
              <Row>
                {geoJSON.features.map((place, index) => (
                  <Col
                    key={index}
                    sm="6"
                    className="mb-5 hover-animate"
                    onMouseEnter={() => onCardEnter(place.properties.id)}
                    onMouseLeave={() => onCardLeave()}
                  >
                    <CardRestaurant
                      data={place.properties}
                      sizes="(max-width:576px) 100vw, (max-width:991px) 50vw, calc(25vw - 60px)"
                    />
                  </Col>
                ))}
              </Row>
            )}
            <Pagination />
          </Col>
          <Col lg="6" className="map-side-lg pe-lg-0">
            <Map
              className="map-full shadow-left"
              center={[51.505, -0.09]}
              zoom={14}
              geoJSON={geoJSON}
              popupVenue
              hoverCard={hoverCard}
            />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Category2
