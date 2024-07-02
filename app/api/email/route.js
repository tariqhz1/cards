import { SMTPClient } from 'emailjs';

export const POST = async (req) => {
    req = await req.json();
    const { name, email, phone, bname, design, message } = req;

    try {
        const client = new SMTPClient({
            user: process.env.EMAIL_HOST,
            password: process.env.EMAIL_HOST_PASSWORD,
            host: 'smtp.gmail.com',
            ssl: true,
        });

        client.send(
            {
                text: 'Contact Us Explanation:',
                attachment: [
                    {
                        data: `<html><div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <p><strong style="font-weight: bold;">Hi,</strong></p>
                        <div style="margin-bottom: 20px;">
                            <p><strong style="font-weight: bold;">Name:</strong> ${name}</p>
                            <p><strong style="font-weight: bold;">Email:</strong> ${email}</p>
                            <p><strong style="font-weight: bold;">Phone:</strong> ${phone}</p>
                            <p><strong style="font-weight: bold;">Business Name:</strong> ${bname}</p>
                            <p><strong style="font-weight: bold;">Custom Design:</strong> ${design}</p>
                            <p><strong style="font-weight: bold;">Message:</strong> ${message}</p>
                        </div>
                        <p><strong style="font-weight: bold;">Regards</strong></p>
                    </div></html>`, alternative: true
                    }],
                from: email,
                to: 'hamzatariq7910@gmail.com',
                subject: 'Cards Contact Query',
            },
            (err) => {
                console.log("error", err)
            }
        )

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error in sending email' }), {
            status: 500,
        });
    }
}