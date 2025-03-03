import {
  faCcAmex,
  faCcMastercard,
  faCcVisa,
} from "@fortawesome/free-brands-svg-icons"
import {
  faCat,
  faChild,
  faGlassCheers,
  faSmokingBan,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

import { Row, Col, Button, Collapse, Form } from "react-bootstrap"

import Select from "react-select"

import { BookingContext } from "../components/BookingContext"
import Avatar from "../components/Avatar"

const BookingForm = (props) => {
  const data = props.data
  const from = props.from
  const to = props.to

  const selectRef = React.useRef()

  const [bookingInputs, setBookingInputs] = React.useContext(BookingContext)

  const [cardCollapse, setCardCollapse] = React.useState(false)

  const onChange = (e) => {
    const value = e.target.value
    setBookingInputs({ ...bookingInputs, [e.target.name]: value })
  }

  const onSelectChange = (name, e) => {
    setBookingInputs({ ...bookingInputs, [name]: e })
  }

  React.useEffect(() => {
    if (selectRef.current !== undefined) {
      onSelectChange(
        selectRef.current.props.name,
        selectRef.current.state.value
      )
    }
  }, [])

  return data.map((block) => (
    <div className="text-block" key={block.title}>
      {block.type === "fromto" && (
        <React.Fragment>
          <h5 className="mb-4">{block.title}</h5>
          <Row className="mb-3">
            <Col md="6" className="d-flex align-items-center mb-3 mb-md-0">
              <div className="date-tile me-3">
                <div className="text-uppercase">
                  <span className="text-sm">{from.month.substring(0, 3)}</span>
                  <br />
                  <strong className="text-lg">{from.day}</strong>
                </div>
              </div>
              <p className="text-sm mb-0">
                {block.checkin.title}
                <br />
                {block.checkin.content}
              </p>
            </Col>
            <Col md="6" className="d-flex align-items-center">
              <div className="date-tile me-3">
                <div className="text-uppercase">
                  <span className="text-sm">{to.month.substring(0, 3)}</span>
                  <br />
                  <strong className="text-lg">{to.day}</strong>
                </div>
              </div>
              <p className="text-sm mb-0">
                {block.checkout.title}
                <br />
                {block.checkout.content}
              </p>
            </Col>
          </Row>
        </React.Fragment>
      )}
      {block.type === "keepinmind" && (
        <React.Fragment>
          <h5 className="mb-4">{block.title}</h5>
          <ul className="list-unstyled">
            {block.items.map((item) => {
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
                <li className="mb-2" key={item.content}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="icon-rounded icon-rounded-sm bg-secondary-light me-4">
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
        </React.Fragment>
      )}
      {block.type === "guests" && (
        <React.Fragment>
          <Form.Label htmlFor={block.name} className="h5">
            {block.title}
          </Form.Label>
          <p className="text-sm text-muted">{block.content}</p>
          <Row>
            <Col lg="6" className="mb-3">
              <Select
                ref={selectRef}
                id={block.name}
                name={block.name}
                options={block.options}
                className="selectpicker"
                classNamePrefix="selectpicker"
                defaultValue={block.options[0]}
                onChange={(e) => onSelectChange(block.name, e)}
              />
            </Col>
          </Row>
        </React.Fragment>
      )}
      {block.type === "radios" && (
        <React.Fragment>
          <h5>{block.title}</h5>
          <p className="text-sm text-muted">{block.content}</p>
          <ul className="list-unstyled">
            {block.radios.map((radio) => (
              <li key={radio.label}>
                <Form.Check
                  type="radio"
                  id={radio.id}
                  name={radio.name}
                  value={radio.id}
                  onChange={(e) => onChange(e)}
                  checked={bookingInputs[radio.name] === radio.id}
                  label={radio.label}
                />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
      {block.type === "textarea" && (
        <React.Fragment>
          <div className="d-flex">
            <div>
              <h5>{block.title}</h5>
              <p className="text-sm text-muted">{block.content}</p>
            </div>
            <div className="ms-4">
              <Avatar
                image="/content/img/avatar/avatar-10.jpg"
                alt="Jack London"
                border
              />
            </div>
          </div>
          <Form.Control
            as="textarea"
            name={block.name}
            style={{ height: "100px" }}
            value={bookingInputs[block.name] || ""}
            onChange={(e) => onChange(e)}
          />
        </React.Fragment>
      )}
      {block.type === "paybycard" && (
        <React.Fragment>
          <div className="d-flex justify-content-between align-items-end mb-4">
            <h5 className="mb-0">{block.title}</h5>
            <div className="text-muted">
              <FontAwesomeIcon icon={faCcAmex} size="2x" className="me-2" />
              <FontAwesomeIcon icon={faCcVisa} size="2x" className="me-2" />
              <FontAwesomeIcon icon={faCcMastercard} size="2x" />
            </div>
          </div>
          <Select
            ref={selectRef}
            id={block.name}
            instanceId={block.name}
            name={block.name}
            options={block.options}
            className="selectpicker mb-3"
            classNamePrefix="selectpicker"
            defaultValue={block.options[0]}
            onChange={(e) => onSelectChange(block.name, e)}
          />
          <Button
            variant="link"
            aria-expanded={cardCollapse}
            className="btn-collapse ps-0 text-muted"
            onClick={() => setCardCollapse(!cardCollapse)}
          >
            {cardCollapse ? "Close" : "Add a new card"}
          </Button>

          <Collapse in={cardCollapse}>
            <Row>
              {block.inputs.map((input) => (
                <Col md={input.col} className="form-group" key={input.name}>
                  <Form.Label htmlFor={input.name} className="form-label">
                    {input.label}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name={input.name}
                    placeholder={
                      input.placeholder ? input.placeholder : input.label
                    }
                    id={input.name}
                    value={bookingInputs[input.name] || ""}
                    onChange={(e) => onChange(e)}
                  />
                </Col>
              ))}
            </Row>
          </Collapse>
        </React.Fragment>
      )}
      {block.type === "policy" && (
        <React.Fragment>
          <h6>{block.title}</h6>
          <div dangerouslySetInnerHTML={{ __html: block.content }} />
        </React.Fragment>
      )}
    </div>
  ))
}

export default BookingForm
