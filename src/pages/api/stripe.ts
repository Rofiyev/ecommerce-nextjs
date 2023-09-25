import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { IProduct } from "../../interface";

const stripeSecretKey: string = process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!;
const stripeConfig: Stripe.StripeConfig = {
  apiVersion: "2023-08-16",
};

const stripe = new Stripe(stripeSecretKey, stripeConfig);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          {
            shipping_rate: "shr_1NuEzOJ5vQEIP6lpLN4tf8et",
          },
        ],
        line_items: req.body.map((item: IProduct) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/idx6gsgp/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "USD",
              product_data: {
                name: item?.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (error: any) {
      res.status(error.status || 500).json({ message: error?.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
