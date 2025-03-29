import ProductView from "@/components/common/ProductView";
import Collection from "./components/Collection";
import Season from "./components/Season";
import FeaturedItem from "./components/FeaturedItem";
import { Suspense } from "react";
import Grid from "./components/Grid";
import FeaturedItemTest from "./components/FeaturedItemTest";
import Newsletter from "./components/Newsletter";
// import Navbar from "@/components/common/Navbar";

const HomeScreen = async () => {
  const featuredItem = "gid://shopify/Product/7814082035892";

  return (
    <>
      <ProductView
        title={"SS24 COLLECTION"}
        id={"gid://shopify/Collection/306787156148"}
      />
      {/* <Collection
        title={"SUMMER'24 COLLECTION"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
        }
      /> */}
      <Season
        title={"FALL 2024"}
        description="To some people we are as nice as we could be but for some we end up turning into villains. Why are human emotions so extreme? Meeting in the middle is called diplomacy but diplomacy is for the smart ones. So how am I suppose to balance my smartness with emotions ? No wonder therapy has become a necessity."
      />
      <Suspense fallback={null}>
        <FeaturedItem id={featuredItem} />
      </Suspense>
      <Grid />
      <Newsletter />
    </>
  );
};

export default HomeScreen;
