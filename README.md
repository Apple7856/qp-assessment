# Grocery Booking API

This API allows users to manage grocery items. It provides endpoints for both admin and user roles.

## Technologies Used

- TypeScript
- Express.js (Node.js framework)
- PostgreSQL (Relational Database)
- Docker (Containerization)

## Setup

1. Clone the repository: https://github.com/Apple7856/qp-assessment.git

2. Navigate to the project directory: https://github.com/Apple7856/qp-assessment

3. Install dependencies: npm install

4. Set up the environment variables:

- Create a `.env` file.
- SERVER_PORT=8008
- DB_PORT=5432
- DB_HOST=localhost
- DB_USERNAME=**\*\***
- DB_PASSWORD=**\*\***
- DB_NAME=Grosery-Booking
- JWT_SECRET=**\*\*\*\***

5. Run the application: npm run start:dev

6. Access the API endpoints at `http://localhost:8008`.

## API Endpoints

### Admin Endpoints

1. Add new grocery item:

- `POST /data/api/v1/admin/product`
- Request body should contain details of the new grocery item.
  [
  {
  "product_name": "product_name 5",
  "product_img": [
  "product_img",
  "sddkfmdkf"
  ],
  "description": "description",
  "quantity": 3,
  "color": [
  "color"
  ],
  "price": 235,
  "isAvailable": true,
  "user_id": "f5e1476f-4771-475c-beeb-d5dd60e55e03"
  }
  ]

2. View existing grocery items:

- `GET /data/api/v1/admin/product`

3. Remove grocery item:

- `DELETE /data/api/v1/admin/product/:id`

4. Update grocery item details:

- `PATCH /data/api/v1/admin/product/77d36c99-6f97-4d7e-943e-072992c67aef`
- Request body should contain updated details of the grocery item.
  {
  "description": "description update",
  "quantity": 20
  }

-

## Advanced Challenge

- Containerize the application using Docker:
- Dockerfile is included in the repository for containerization.
- Use `docker-compose.yml` for multi-container setup if needed.

## Database Schema

TBD (Describe the schema used for the PostgreSQL database)

## Contribution

Contributions are welcome! Please fork the repository and submit pull requests with improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries, reach out to [dp.9.singh@gmail.com] or [8726854923](mailto:your-email@example.com).

## Acknowledgements

- Thank you to the creators of TypeScript, Express.js, PostgreSQL, and Docker for their amazing tools and documentation.
