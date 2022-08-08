const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const Stripe = require("stripe")(process.env.SECRET_KEY);
var cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8080;

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Your serve is running on port ${port}.`);
});

app.post("/create-payment-intent", async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "INR",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
  console.log(token);
});

// // This is your test secret API key.
// const express = require("express");
// const stripe = require('stripe')('sk_test_51LP6KFSJb2FqEHTGdKgfTdJUtnNtCKeY0my7joCHCZXdHgqaOZvtjNhB1h2bdRhPOwVpJ7UCVIQXJJ2qCGRSdS3J00OONNjAPU');
// const app = express();
// app.use(express.json());

// // const YOUR_DOMAIN = 'http://localhost:8100';
// // app.use( (req, res, next) => {
// //     res.header("Access-Control-Allow-Origin", "http://localhost:8100");
// //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
// //     next();
// // });

// app.post('/payment', async (req, res) => {
//     const {product, routes} = req.body;
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price_data: {
//             currency: "INR",
//             product_data: {
//                 price: product.amount,
//             }
//         }
//       },
//     ],
//     mode: 'payment',
//     success_url: routes.success_url,
//     cancel_url: routes.cancel_url,
//   });
//   res.json({id: session.id})
//   res.redirect(303, session.url);
// });
// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log('Running on port 8100'));
