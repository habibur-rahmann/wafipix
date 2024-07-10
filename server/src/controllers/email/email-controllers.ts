import { Request, Response } from "express";
import { asyncHandler } from "../../middlewares/async-handler";
import { sendEmail } from "../../lib/nodemailer";
import { ApiError } from "../../lib/custom-api-error-class";

export const emailController = {
  sendContactMail: asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, message, sourceOfCustomer, isSubscribe } =
      req.body as {
        name: string;
        email: string;
        phone: string;
        message: string;
        sourceOfCustomer: string;
        isSubscribe: boolean;
      };

    if (!name) throw new ApiError("Name is required!", 404);
    if (!email) throw new ApiError("Email is required!", 404);
    if (!message) throw new ApiError("message is required!", 404);
    const emailText = `
    Client Details \n
    --------------------------------------------\n
    name: ${name} \n
    email: ${email} \n
    phone: ${phone ? phone : "not given"} \n\n

    Text message \n
    --------------------------------------------\n
    ${message} \n\n

    Others \n
    --------------------------------------------\n
    source of customer: ${sourceOfCustomer}\n
    subscribe newsletter: ${isSubscribe ? "Yes" : "No"}\n\n\n

    This message is from wafipix.com sent by ${name}.
    `;

    const info = await sendEmail({
      subject: "Contact email form wafipix.",
      to: process.env.CONTACT_MAIL!,
      text: emailText,
    });

    res.status(200).json({ success: true, info });
  }),
};
