import React from "react"

import { Container, Row, Col, Form, Collapse, Button } from "react-bootstrap"

import Select from "react-select"
import Nouislider from "nouislider-react"

import CardRestaurant from "../components/CardRestaurant"
import ResultsTopBar from "../components/ResultsTopBar"
import Pagination from "../components/Pagination"

import data from "../data/category3.json"
import geoJSON from "../data/restaurants-geojson.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons"

export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Restaurants | Category - No map",
    },
  }
}

const Category3 = () => {
  const [filterCollapse, setFilterCollapse] = React.useState(false)
  const [priceMin, setPriceMin] = React.useState(40)
  const [priceMax, setPriceMax] = React.useState(110)

  const priceSlider = (render, handle, value, un, percent) => {
    setPriceMin(value[0].toFixed(0))
    setPriceMax(value[1].toFixed(0))
  }
  return (
    <React.Fragment>
      <Container fluid className="py-5 px-lg-5">
        <Row className="border-bottom mb-4">
          <Col xs="12">
            <h1 className="display-4 fw-bold text-serif mb-4">{data.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col lg="3" className="pt-3">
            <Form className="pe-xl-3">
              <div className="mb-4">
                <Form.Label htmlFor="form_search" className="form-label">
                  Keyword
                </Form.Label>
                <div className="input-label-absolute input-label-absolute-right">
                  <div className="label-absolute">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <Form.Control
                    type="search"
                    name="search"
                    placeholder="Keywords"
                    id="form_search"
                    className="pe-4"
                  />
                </div>
              </div>
              <div className="mb-4">
                <Form.Label htmlFor="form_neighbourhood" className="form-label">
                  Neighbourhood
                </Form.Label>
                <Select
                  name="neighbourhood"
                  inputId="form_neighbourhood"
                  options={data.neighbourhood && data.neighbourhood}
                  isMulti
                  isSearchable
                  className="form-control dropdown bootstrap-select"
                  classNamePrefix="selectpicker"
                />
              </div>
              <div className="mb-4">
                <Form.Label htmlFor="form_category" className="form-label">
                  Category
                </Form.Label>
                <Select
                  name="category"
                  inputId="form_category"
                  options={data.categories && data.categories}
                  className="form-control dropdown bootstrap-select"
                  classNamePrefix="selectpicker"
                />
              </div>
              {data.tags && (
                <div className="mb-4">
                  <Form.Label className="form-label">
                    {data.tags.title}
                  </Form.Label>
                  <ul className="list-unstyled mb-0">
                    {data.tags.items.map((tag) => (
                      <li key={tag.value}>
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
              <div className="pb-4">
                <Collapse in={filterCollapse}>
                  <div>
                    {data.cuisine && (
                      <div className="mb-4">
                        <Form.Label className="form-label">
                          {data.cuisine.title}
                        </Form.Label>
                        <ul className="list-unstyled mb-0">
                          {data.cuisine.items.map((tag) => (
                            <li key={tag.value}>
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
                    <div className="mb-4">
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
                          <span id="slider-snap-value-from">{priceMin}</span>
                        </div>
                        <div className="max">
                          To $<span id="slider-snap-value-to">{priceMax}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <Form.Label className="form-label">
                        Vegetarians
                      </Form.Label>
                      <ul className="list-unstyled mb-0">
                        <li>
                          <Form.Check
                            type="radio"
                            id="vegetarians_0"
                            name="vegetarians"
                            label="All"
                          />
                        </li>
                        <li>
                          <Form.Check
                            type="radio"
                            id="vegetarians_1"
                            name="vegetarians"
                            label="Vegetarian only"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </div>
              <div className="mb-4">
                <Button
                  aria-expanded={filterCollapse}
                  variant="link"
                  className="ps-0 text-secondary btn-collapse"
                  onClick={() => setFilterCollapse(!filterCollapse)}
                >
                  {filterCollapse ? "Less filters" : "More filters"}
                </Button>
              </div>
              <div className="mb-4">
                <Button type="submit">
                  <FontAwesomeIcon icon={faFilter} className="me-1" />
                  Filter
                </Button>
              </div>
            </Form>
          </Col>
          <Col lg="9">
            <ResultsTopBar sortBy={data.sortby} />
            {geoJSON.features && (
              <Row>
                {geoJSON.features.map((place, index) => (
                  <Col key={index} sm="6" lg="4" className="mb-5 hover-animate">
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
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Category3
