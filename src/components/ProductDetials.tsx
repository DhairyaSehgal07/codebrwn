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
const ProductDetials = ({ productDetails }: { productDetails: string }) => {
  const { part1, part2 } = splitProductDetails(productDetails);
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
              <div className="mt-4 flex items-center justify-center">
                <p
                  style={{
                    textAlign: "justify", // Align text evenly on both sides
                    hyphens: "auto", // Enable hyphenation for better text wrapping
                  }}
                  className={`${outfit.className} text-center text-[18px] font-light leading-[28.6px] tracking-[0.6px]`}
                >
                  {part1}
                </p>
              </div>

              <div className="mt-4 flex flex-col items-center justify-center">
                <p
                  style={{
                    textAlign: "justify", // Align text evenly on both sides
                    hyphens: "auto", // Enable hyphenation for better text wrapping
                  }}
                  className={`${outfit.className} text-center text-[18px] font-light leading-[28.6px] tracking-[0.6px]`}
                >
                  <span className="font-bold">Key Features</span>{" "}
                  {/* Bold heading */}
                  <br /> {/* Line break */}
                  {part2.replace("Key Features", "").trim()}{" "}
                  {/* Continue the paragraph */}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="border-b-black/60" value="item-2">
            <AccordionTrigger
              className={`${outfit.className} text-[20px] font-bold leading-[24px] text-[#110000]`}
            >
              Sizing
            </AccordionTrigger>
            <AccordionContent
              className={`${outfit.className} font-light leading-[20.8px] tracking-[0.6px]`}
            >
              <p>{"Model is 5'9 and wearing size S"}</p>
              <p>{"Item-specific measurements are listed in inches"}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell
                      className={`${outfit.className} text-xs leading-[14px] text-[#110000]`}
                    >
                      SIZE
                    </TableCell>
                    <TableHead
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      XS
                    </TableHead>
                    <TableHead
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      S
                    </TableHead>
                    <TableHead
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      M
                    </TableHead>
                    <TableHead
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      L
                    </TableHead>
                    <TableHead
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      XL
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className={`${outfit.className} text-xs leading-[14px] text-[#110000]`}
                    >
                      BODY LENGTH
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      24
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      25
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      26
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      27
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      28
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className={`${outfit.className} text-xs leading-[14px] text-[#110000]`}
                    >
                      CHEST
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      32
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      34
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      36
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      38
                    </TableCell>
                    <TableCell
                      className={` ${outfit.className} text-right text-sm font-semibold leading-[14px] text-[#110000]`}
                    >
                      40
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="border-b-black/60" value="item-3">
            <AccordionTrigger
              className={`${outfit.className} text-[20px] font-bold leading-[24px] text-[#110000]`}
            >
              Returns & Exchanges
            </AccordionTrigger>
            <AccordionContent
              className={`${outfit.className} font-light leading-[20.8px] tracking-[0.6px]`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
};

export default ProductDetials;
