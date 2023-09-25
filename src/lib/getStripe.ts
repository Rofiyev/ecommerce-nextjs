import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const key: string = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) stripePromise = loadStripe(key);

  return stripePromise;
};
export default getStripe;
