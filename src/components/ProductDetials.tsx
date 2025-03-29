import React from "react";
import { splitProductDetails } from "@/utils/helper";
import { outfit } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const ProductDetials = ({
  productDetails,
  productType,
}: {
  productDetails: string;
  productType: string;
}) => {
  const splitDetails = splitProductDetails(productDetails);

  // console.log("SPLIT DETAILS IS : ", splitDetails);

  return (
    <>
      <section className="mt-24 lg:mt-16">
        <Accordion
          defaultValue={["product-details"]}
          type="multiple"
          className="w-full"
        >
          <AccordionItem className="border-b-black/60" value="product-details">
            <AccordionTrigger
              className={`${outfit.className} text-[20px] font-bold leading-[24px] text-[#110000]`}
            >
              Product Details
            </AccordionTrigger>
            <AccordionContent
              className={`${outfit.className} font-light leading-[20.8px] tracking-[0.6px]`}
            >
              <div className="mb-4 flex flex-col gap-8">
                <p
                  style={{
                    textAlign: "justify",
                    hyphens: "auto",
                  }}
                  className={`${outfit.className} text-center text-base font-light leading-[28.6px] tracking-[0.6px]`}
                >
                  {splitDetails.description}
                </p>

                {splitDetails.keyFeatures && (
                  <>
                    <section>
                      <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                        Key Features:
                      </h3>
                      <ul
                        style={{
                          textAlign: "justify",
                          hyphens: "auto",
                        }}
                        className="mt-4 list-inside pl-1"
                      >
                        {splitDetails.keyFeatures.map((item, index) => (
                          <li
                            className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]"
                            style={{ listStyleType: "disc" }}
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}

                {splitDetails.composition.length > 0 && (
                  <>
                    <section>
                      <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                        Composition
                      </h3>
                      <ul
                        style={{
                          textAlign: "justify",
                          hyphens: "auto",
                        }}
                        className="mt-4 list-inside pl-1"
                      >
                        {splitDetails.composition.map((item, index) => (
                          <li
                            className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]"
                            style={{ listStyleType: "disc" }}
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}

                {splitDetails.garmentCare.length > 0 && (
                  <>
                    <section>
                      <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                        Garment Care:
                      </h3>
                      <ul
                        style={{
                          textAlign: "justify",
                          hyphens: "auto",
                        }}
                        className="mt-4 list-inside pl-1"
                      >
                        {splitDetails.garmentCare.map((item, index) => (
                          <li
                            className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]"
                            style={{ listStyleType: "disc" }}
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}

                {splitDetails.washCare.length > 0 && (
                  <>
                    <section>
                      <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                        Wash Care:
                      </h3>
                      <ul
                        style={{
                          textAlign: "justify",
                          hyphens: "auto",
                        }}
                        className="mt-4 list-inside pl-1"
                      >
                        {splitDetails.washCare.map((item, index) => (
                          <li
                            className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]"
                            style={{ listStyleType: "disc" }}
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {productType == "Cap" ? (
            <></>
          ) : (
            <>
              <AccordionItem className="border-b-black/60" value="item-2">
                <AccordionTrigger
                  className={`${outfit.className} text-[20px] font-bold leading-[24px] text-[#110000]`}
                >
                  Sizing
                </AccordionTrigger>
                <AccordionContent
                  className={`${outfit.className} font-light leading-[20.8px] tracking-[0.6px]`}
                >
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          <span className="font-semibold">SIZE (INCHES)</span>
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          XS
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          S
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          M
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          L
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          XL
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          LENGTH
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          27.5
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          28
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          28.5
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          29
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          29.5
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          SHOULDER
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          18
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          18.5
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          19
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          19.5
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          20
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          SLEEVE
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          11.25
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          11.25
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          11.5
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          11.5
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          11.75
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          CHEST
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          44
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          46
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          48
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          50
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          52
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table className="mt-10 w-full">
                    <TableHeader>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          <span className="font-semibold">SIZE (CM)</span>
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          XS
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          S
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          M
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          L
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          XL
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          LENGTH
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          69.85
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          71.12
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          72.39
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          73.66
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          74.93
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          SHOULDER
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          45.72
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          46.99
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          48.26
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          49.53
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          50.8
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          SLEEVE
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          28.575
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          28.575
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          29.21
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          29.21
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          29.845
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className={`${outfit.className} text-left text-xs leading-[14px] text-[#110000]`}
                          // Add padding to create horizontal gap
                        >
                          CHEST
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          111.76
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          116.84
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          121.92
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          127
                        </TableCell>
                        <TableCell
                          className={`${outfit.className} text-center text-sm font-semibold leading-[14px] text-[#110000]`}
                        >
                          132.08
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </>
          )}

          <AccordionItem className="border-b-black/60" value="item-3">
            <AccordionTrigger
              className={`${outfit.className} text-[20px] font-bold leading-[24px] text-[#110000]`}
            >
              Returns & Exchanges
            </AccordionTrigger>
            <AccordionContent
              className={`${outfit.className} font-light leading-[20.8px] tracking-[0.6px]`}
            >
              <p
                style={{
                  textAlign: "justify",
                  hyphens: "auto",
                }}
                className={`${outfit.className} text-center text-base font-light leading-[28.6px] tracking-[0.6px]`}
              >
                At CODEBRWN, we currently offer exchanges only. No refunds. If
                the product you receive {"isn't"} the right size/damaged, you
                can exchange it under the following terms:
              </p>

              <div className="mt-4">
                <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                  Eligibility for Exchange:
                </h3>
                <ul
                  className="mt-2 list-inside pl-1"
                  style={{
                    listStyleType: "disc",
                    textAlign: "left",
                    hyphens: "auto",
                  }}
                >
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Items must be in the same condition as received: unworn,
                    unused, with tags, and in the original packaging.
                  </li>
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Proof of purchase or payment receipt is required.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                  Exchange Procedure:
                </h3>
                <ul
                  className="mt-2 list-inside pl-1"
                  style={{
                    listStyleType: "disc",
                    textAlign: "left",
                    hyphens: "auto",
                  }}
                >
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Please initiate an exchange request with us before returning
                    the item.
                  </li>
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Returns sent without prior exchange request will not be
                    processed.
                  </li>
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Customers are responsible for return shipping fees.
                  </li>
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    The exchange request must be made within 7 days of receiving
                    the product.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                  If Desired Size Is Unavailable:
                </h3>
                <ul
                  className="mt-2 list-inside pl-1"
                  style={{
                    listStyleType: "disc",
                    textAlign: "left",
                    hyphens: "auto",
                  }}
                >
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    You may select an alternate product of equal value. (Given
                    that we have that product in stock)
                  </li>
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Unfortunately, we will not be able to initiate an exchange.
                    Therefore, we request you to carefully choose your size from
                    the given size measurements on the website.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                  Damages and Issues:
                </h3>
                <ul
                  className="mt-2 list-inside pl-1"
                  style={{
                    listStyleType: "disc",
                    textAlign: "left",
                    hyphens: "auto",
                  }}
                >
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Inspect your order upon delivery. Contact us within 24 hours
                    if the item is defective, damaged, or incorrect. To report a
                    damaged item, please send an email to support@codebrwn.com
                    including your order number and clear photographs of the
                    defect. Upon confirmation, and a quality check by us, we
                    will arrange for the return of the damaged product and a
                    replacement to be shipped to you. Claims made after 24 hours
                    will not be processed.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-left text-base font-bold leading-[28.6px] tracking-spaced-06">
                  Cancellation Policy:
                </h3>
                <ul
                  className="mt-2 list-inside pl-1"
                  style={{
                    listStyleType: "disc",
                    textAlign: "left",
                    hyphens: "auto",
                  }}
                >
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Orders cannot be cancelled once dispatched.
                  </li>
                  <li className="mt-2 text-base font-light leading-[28.6px] tracking-[0.6px]">
                    Cancellations are only possible if the order is still
                    processing and has not been dispatched.
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <p
                  style={{
                    textAlign: "justify",
                    hyphens: "auto",
                  }}
                  className={`${outfit.className} text-center text-base font-light leading-[28.6px] tracking-[0.6px]`}
                >
                  For any questions or concerns, please reach out to us at
                  support@codebrwn.com. We will try to get back to you asap
                  regarding any of your problems. For business queries ONLY,
                  please reach out{" "}
                  <em className="font-medium">aayush@codebrwn.com</em>.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
};

export default ProductDetials;
