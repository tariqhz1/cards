import React from "react";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "Will My New Metal Card Work?",
      answer:
        "Yes! Your new metal card will work everywhere globally. Plus, it is a great marketing tool when potential clients see your company logo.",
    },
    {
      id: 2,
      question: "What happens if my card is lost or stolen?    ",
      answer:
        "Contact your bank ASAP. You must treat this the same as any debit or credit card that is owned by the card issuer.",
    },
    {
      id: 3,
      question: "How Long Does the Process Take?",
      answer:
        "Send us your plastic card and we will notify you once this is received. We recommend sending this Express so you can always track it and avoid any delays. Once received we will begin production of your new custom card and it will be ready for postage within 1-2 days. From here we will send both your cards new and old back to you via your choice of shipping.",
    },
    {
      id: 3,
      question: "Is It Safe?",
      answer:
        "Yes! Carbon Co. Skins take the utmost care of your financial safety. We always recommend you ‘freeze’ your card before shipping it to us. We DO NOT record any personal data. Our equipment does not store any personal data, it simply transfers from A to B.",
    },
    {
      id: 5,
      question: "What can I Have on my Custom Card?    ",
      answer:
        "You are solely responsible for the content that you post/upload and Carbon Co Skins doesn’t assume liability for copyright and trademark infringements.",
    },
    {
      id: 6,
      question: "Will my card work in ATM machines?",
      answer:
        "All of our metal cards work in ATM machines. However, it is not recommended to use metal cards in ATM machines that require the full insertion of the card into the reader. Due to the metal cards being heavier than plastic cards, some full insertion machine’s rollers may be too stiff to eject the card. We recommend you only use partial insertion devices, where you can always see part of the card, in order to remove it manually.",
    },
    {
      id: 7,
      question: "Is my card compatible?",
      answer:
        "We can upgrade almost any plastic card that has a chip and/or a magnetic strip. There are some rare chip types that are not compatible with our cards – please see the How It Works page. If you do order with a non-compatible chip, we are unable to offer refunds.",
    },
    {
      id: 8,
      question: "Where do you Ship? ",
      answer:
        "We ship globally. Please be mindful that due to the current Global Pandemic shipping may experience some delays.",
    },
    {
      id: 9,
      question: "How Much Does Shipping Cost?    ",
      answer:
        "We offer complimentary Express shipping Australia wide. We also offer Standard and Express International Shipping (see price at checkout)",
    },
    {
      id: 10,
      question: "Shipping times?    ",
      answer:
        "The overall product turnaround time, depends on how the customer ships any items for customisation to us. We always recommend to use an express / priority service with tracking.We also offer DHL express collection and delivery upon request.",
    },
    {
      id: 11,
      question: "Uploading Your Logo",
      answer:
        "Once you have your design, you will need to upload your image/ logo to our website. A vector file or transparent background is preferred.",
    },
    {
      id: 12,
      question: "Where are you located?    ",
      answer: "Gold Coast, Australia.      ",
    },
  ];
  return (
    <div className="bg-slate-50">
      {/* FAQ */}
      <section
        className="mx-auto max-w-md divide-y-2 divide-slate-200  px-6 py-24 sm:max-w-3xl lg:max-w-7xl lg:px-8 lg:py-32"
        aria-labelledby="faq-heading"
      >
        <h2
          className="text-3xl font-bold tracking-tight text-slate-900 text-center mb-[38px]"
          id="faq"
        >
          Frequently asked questions
        </h2>
        <div className="mt-6 pt-10">
          <dl className="space-y-10 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg font-medium text-slate-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-slate-500">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
