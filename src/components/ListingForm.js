import React from "react"

import Link from "next/link"

import { Row, Col, Form, Button } from "react-bootstrap"

import Select from "react-select"
import { useDropzone } from "react-dropzone"

import { FormContext } from "../components/FormContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

const ListingForm = (props) => {
  const data = props.data
  const [formInputs, setFormInputs] = React.useContext(FormContext)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFormInputs({
        ...formInputs,
        ["files"]: acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      })
    },
  })

  const onChange = (e) => {
    const value = e.target.value
    setFormInputs({ ...formInputs, [e.target.name]: value })
  }

  const onCheckboxChange = (e) => {
    const value = e.target.value
    setFormInputs({ ...formInputs, [e.target.id]: !value })
  }

  const onSelectChange = (name, e) => {
    setFormInputs({ ...formInputs, [name]: e })
  }

  const onButtonDecrease = (e, name) => {
    const value = parseInt(e.target.nextElementSibling.value, 10)
    setFormInputs({ ...formInputs, [name]: value - 1 })
  }
  const onButtonIncrease = (e, name) => {
    const value = parseInt(e.target.previousElementSibling.value, 10)
    setFormInputs({ ...formInputs, [name]: value + 1 })
  }

  return (
    <Form>
      {data.formBlocks.map((block) => (
        <Row className="form-block" key={block.title}>
          <Col lg="4">
            <h4>{block.title}</h4>
            <p className="text-muted text-sm">{block.content}</p>
          </Col>
          <Col lg="7" className="ms-auto">
            {block.inputs.map((input, index) => (
              <React.Fragment key={index}>
                {input.type === "text" && (
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={formInputs[input.name] || ""}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                )}
                {input.type === "textarea" && (
                  <div className="mb-5">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      rows="5"
                      input={input.name}
                      name={input.name}
                      id={input.name}
                      value={formInputs[input.name] || ""}
                      onChange={(e) => onChange(e)}
                      aria-describedby={input.helpId}
                    />
                    <small
                      id={input.helpId}
                      className="form-text text-muted mt-2"
                    >
                      {input.help}
                    </small>
                  </div>
                )}
                {input.type === "select" && (
                  <div className="mb-4">
                    <Form.Label htmlFor={input.name}>{input.label}</Form.Label>
                    <Select
                      id={input.name}
                      instanceId={input.name}
                      name={input.name}
                      options={input.options}
                      className="selectpicker"
                      classNamePrefix="selectpicker"
                      value={formInputs[input.name] || ""}
                      onChange={(e) => onSelectChange(input.name, e)}
                    />
                    {input.text && (
                      <small
                        id="propertyTypeHelp"
                        className="form-text text-muted"
                      >
                        {input.text}
                      </small>
                    )}
                  </div>
                )}
                {input.type === "radios" && (
                  <div className="mb-4">
                    <Form.Label>{input.label}</Form.Label>

                    {input.radios.map((radio) => (
                      <Form.Check
                        key={radio.label}
                        type="radio"
                        id={radio.id}
                        name={radio.name}
                        value={radio.id}
                        onChange={(e) => onChange(e)}
                        checked={formInputs[radio.name] === radio.id}
                        label={radio.label}
                      />
                    ))}
                  </div>
                )}
                {input.type === "form-group" && (
                  <Row>
                    {input.inputs.map((input) => (
                      <Col md={input.col} key={input.name}>
                        <div className="mb-4">
                          <Form.Label
                            htmlFor={input.name}
                            className="form-label"
                          >
                            {input.label}
                          </Form.Label>
                          <Form.Control
                            name={input.name}
                            id={input.name}
                            value={formInputs[input.name] || ""}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "buttons" && (
                  <Row>
                    {input.buttons.map((button) => (
                      <Col lg="4" key={button.name}>
                        <Form.Label>{button.label}</Form.Label>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="items"
                            className="btn-item-decrease"
                            onClick={(e) => onButtonDecrease(e, button.name)}
                          >
                            -
                          </Button>
                          <Form.Control
                            name={button.name}
                            value={formInputs[button.name] || 1}
                            disabled
                            className="input-items"
                          />
                          <Button
                            variant="items"
                            className="btn-item-increase"
                            onClick={(e) => onButtonIncrease(e, button.name)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                    ))}
                  </Row>
                )}
                {input.type === "checkboxes" && (
                  <div className="mb-4">
                    <Form.Label>{input.label}</Form.Label>
                    <ul className="list-inline mb-0">
                      {input.checkboxes.map((checkbox) => (
                        <li key={checkbox.id} className="list-inline-item">
                          <Form.Check
                            type="checkbox"
                            id={checkbox.id}
                            name={checkbox.name}
                            value={formInputs[checkbox.id] || ""}
                            onChange={(e) => onCheckboxChange(e)}
                            label={checkbox.label}
                            className="text-muted"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {input.type === "upload" && (
                  <div className="mb-4">
                    <div
                      {...getRootProps({ className: "dropzone dz-clickable" })}
                    >
                      <input {...getInputProps()} />
                      <div className="dz-message text-muted">
                        <p>Drop files here or click to upload.</p>
                        <p>
                          <span className="note">
                            (This is just a demo dropzone. Selected files are{" "}
                            <strong>not</strong> actually uploaded.)
                          </span>
                        </p>
                      </div>
                    </div>
                    <Row className="mt-4">
                      {formInputs["files"] &&
                        formInputs["files"].map((file) => (
                          <div key={file.name} className="col-lg-4">
                            <div>
                              <img
                                src={file.preview}
                                className="img-fluid rounded shadow mb-4"
                              />
                            </div>
                          </div>
                        ))}
                    </Row>
                  </div>
                )}
              </React.Fragment>
            ))}
          </Col>
        </Row>
      ))}
      <Row className="form-block flex-column flex-sm-row">
        <Col className="text-center text-sm-start">
          {props.prevStep && (
            <Link href={props.prevStep} passHref>
              <Button variant="link" className="text-muted">
                <FontAwesomeIcon icon={faChevronLeft} className="me-2" />
                Back
              </Button>
            </Link>
          )}
        </Col>
        <Col className="text-center text-sm-end">
          {props.nextStep && (
            <Link href={props.nextStep} passHref>
              <Button className="px-3">
                Next step
                <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
              </Button>
            </Link>
          )}
          {props.finish && (
            <Link href={props.finish} passHref>
              <Button className="px-3">
                Finish
                <FontAwesomeIcon icon={faChevronRight} className="ms-2" />
              </Button>
            </Link>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export default ListingForm
