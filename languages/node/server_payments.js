const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
if (process.env.ENABLE_CORS === '1') app.use(cors());

// Configure Stripe via env vars
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY; // sk_test_...
const PRICE_ID = process.env.PRICE_ID; // price_...

let stripe = null;
try {
  stripe = require('stripe')(STRIPE_SECRET_KEY || '');
} catch (e) {
  console.warn('Stripe not configured yet. Set STRIPE_SECRET_KEY.');
}

app.post('/api/checkout', async (req, res) => {
  try {
    if (!stripe || !STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: 'Stripe not configured. Set STRIPE_SECRET_KEY env.' });
    }
    if (!PRICE_ID) {
      return res.status(400).json({ error: 'PRICE_ID not set.' });
    }
    const { success_url, cancel_url, customer_email } = req.body || {};
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: success_url || 'http://localhost:3000/?checkout=success',
      cancel_url: cancel_url || 'http://localhost:3000/?checkout=cancel',
      customer_email: customer_email,
      allow_promotion_codes: true,
    });
    return res.json({ url: session.url });
  } catch (err) {
    console.error('checkout error', err);
    return res.status(500).json({ error: String(err) });
  }
});

const port = process.env.PORT || 5003;
app.listen(port, () => console.log(`Payments server on ${port}`));
