import React from "react"
import Link from "next/link"
import { Media, Card } from "react-bootstrap"

import Stars from "../components/Stars"
import Icon from "./Icon"
import Image from "../components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRight, faUsers } from "@fortawesome/free-solid-svg-icons"
import { faCalendar } from "@fortawesome/free-regular-svg-icons"

const BookingColumn = (props) => {
  const from = props.from
  const to = props.to
  return (
    <Card className="border-0 shadow">
      <Card.Body className="p-4">
        <div className="text-block pb-3">
          <div className="d-flex align-items-center">
            <div>
              <h6>
                <Link href="/detail-rooms">
                  <a className="text-reset">
                    Modern Apt - Vibrant Neighborhood
                  </a>
                </Link>
              </h6>
              <p className="text-muted text-sm mb-0">
                Entire home in New York
                <span className="mt-n1 d-block">
                  <Stars stars={4} size="sm" color="text-primary" />
                </span>
              </p>
            </div>
            <Link href="/detail-rooms">
              <a className="ms-3">
                <Image
                  src="/content/img/photo/photo-1512917774080-9991f1c4c750.jpg"
                  width={100}
                  height={67}
                  layout="fixed"
                  alt=""
                  className="rounded"
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="text-block py-3">
          <ul className="list-unstyled mb-0">
            <li className="mb-3">
              <FontAwesomeIcon
                icon={faUsers}
                className="fa-fw text-muted me-2"
              />
              3 guests
            </li>
            <li className="mb-0">
              <FontAwesomeIcon
                icon={faCalendar}
                className="fa-fw text-muted me-2"
              />
              {from.month.substring(0, 3)} {from.day}, {from.year}{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="fa-fw text-muted mx-3"
              />
              {to.month.substring(0, 3)} {to.day}, {to.year}
            </li>
          </ul>
        </div>
        <div className="text-block pt-3 pb-0">
          <table className="w-100">
            <tbody>
              <tr>
                <th className="fw-normal py-2">$432.02 x 1 night</th>
                <td className="text-end py-2">$432.02</td>
              </tr>
              <tr>
                <th className="fw-normal pt-2 pb-3">Service fee</th>
                <td className="text-end pt-2 pb-3">$67.48</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-top">
                <th className="pt-3">Total</th>
                <td className="fw-bold text-end pt-3">$499.50</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card.Body>
      <Card.Footer className="bg-primary-light py-4 border-0">
        <div className="d-flex align-items-center">
          <div>
            <h6 className="text-primary">Flexible – free cancellation</h6>
            <p className="text-sm text-primary opacity-8 mb-0">
              Cancel within 48 hours of booking to get a full refund.{" "}
              <a href="#" className="text-reset ms-3">
                More details
              </a>
            </p>
          </div>
        </div>
      </Card.Footer>
    </Card>
  )
}

export default BookingColumn
