
# Get Funded

## Description
The One Solution for finding investors based on name, location, industry preferences, fund type etc. from a database of over 90000+ investors.

## How to Run Locally
1. Clone the repository: `git clone https://github.com/uday-biswas/findInvestor.git`
2. Open the terminal inside the main folder and run these commands to install dependencies:
```
npm install
cd frontend
npm install
cd ../backend
npm install 
cd ..
```
3. Create a `.env` file inside the frontend folder and define the backend url:
```
VITE_BACKEND_URL=http://localhost:4000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY = YOUR_PRIMARY_KEY_STRIPE
```
4. Then create a `.env` file inside the backend folder and define the following:
```
PORT_BACKEND=4000
FRONTEND_URL='http://localhost:5173'

DATABASE_URL= YOUR_MONGODB_URL

JWT_SECRET= RANDOM_SECRET_STRING
JWT_EXPIRES_IN=1d
JWT_COOKIE_EXPIRES_IN=3

MAIL_HOST='smtp.gmail.com'
MAIL_USER= YOUR_MAIL_ID
MAIL_PASSWORD= YOUR_MAIL_PASSWORD

STRIPE_SECRET= YOUR_STRIPE_SECRET
GOLD_PRICE= NUMERICAL VALUE
SILVER_PRICE = NUMERICAL VALUE

```
4. Start the frontend as well as backend with a single command : 
```
npm run dev
```

## or

   firstly, start the backend with the following commands: 
```
cd backend
npm run server
```
   and open another terminal and start the frontend with the following commands : 
```
cd frontend
npm start
```
5. Open your browser and navigate to `http://localhost:5173`

## Technologies Used
- React.js for the frontend
- Node.js and Express.js for the backend
- MongoDB for the database
- JWT (JSON Web Tokens) for authentication
- Nodemailer for sending emails

## Deployment

- The frontend is deployed in vercel. [Link](https://getfunded-opal.vercel.app/) :point_left:
- The backend is deployed in render. [Link](https://findinvestor.onrender.com) :point_left:

## Getting Started
- Follow the live demo links above and enjoy the site.

### Prerequisites

- A modern browser, up to date.  :muscle:

## Author

👤 Uday Biswas
- Github: [@UdayBiswas](https://github.com/uday-biswas) 
- Linkedin: [@UdayBiswas](https://www.linkedin.com/in/udaybiswas944/)  

## Show your support

Give a ⭐️ if you like this project!
