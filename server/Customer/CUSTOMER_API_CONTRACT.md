# Customer API Contract

## Base URL
`/api/v1/customer`

## Endpoints

### `GET /quotations`
Returns a list of quotations for the customer.

### `GET /quotations/:id`
Returns details of a specific quotation, including line items.

### `POST /quotations/:id/confirm`
Updates the status of a quotation to `Accepted`.

### `GET /negotiations`
Returns the negotiation history for the customer's quotations.

### `POST /negotiations`
**Body:** `{ quoteId, message, counterDiscount, lineId }`
Submits a negotiation request/comment. Automatically updates the quotation status to `Under Negotiation`.

### `GET /notifications`
Returns the list of unread/read notifications for the customer.
