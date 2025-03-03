import React from "react"

import { Row, Col } from "react-bootstrap"

import Avatar from "../../Avatar"
const AvatarComponent = () => {
  return (
    <div id="avatar" className="docs-item element">
      <h5 className="text-uppercase mb-4">Avatar</h5>
      <div className="docs-desc">
        <p className="lead">Component to display your user image.</p>
        <h6 className="text-dark">Supported props for Avatar component:</h6>
        <ul>
          <li>
            <b>className</b> - classes for <code>Avatar</code> element
          </li>
          <li>
            <b>size</b> - avatar size <code>xxl, xl, lg, sm, xs, xxs</code>.
            Leave empty for default size.
          </li>
          <li>
            <b>image</b> - image url
          </li>
          <li>
            <b>alt</b> - image alt
          </li>
          <li>
            <b>border</b> - if true, border will be shown around avatar.
          </li>
        </ul>
      </div>
      <div className="mt-5">
        <Row className="align-items-center text-center mb-5">
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-0.jpg"
              alt="Image"
              className="mb-3"
              border
              size="xxl"
            />
            <code className="d-block">avatar-xxl/border</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-1.jpg"
              alt="Image"
              className="mb-3"
              size="xxl"
            />
            <code className="d-block">avatar-xxl</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-2.jpg"
              alt="Image"
              className="mb-3"
              size="xl"
            />
            <code className="d-block">avatar-xl</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-3.jpg"
              alt="Image"
              className="mb-3"
              size="lg"
            />
            <code className="d-block">avatar-lg</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-4.jpg"
              alt="Image"
              className="mb-3"
            />
            <code className="d-block">avatar</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-5.jpg"
              alt="Image"
              className="mb-3"
              size="sm"
            />
            <code className="d-block">avatar-sm</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-6.jpg"
              alt="Image"
              className="mb-3"
              size="xs"
            />
            <code className="d-block">avatar-xs</code>
          </Col>
          <Col xs="auto">
            <Avatar
              image="/content/img/avatar/avatar-6.jpg"
              alt="Image"
              className="mb-3"
              size="xxs"
            />
            <code className="d-block">avatar-xxs</code>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AvatarComponent
