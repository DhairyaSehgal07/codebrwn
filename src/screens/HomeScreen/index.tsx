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
      <Collection
        title={"SUMMER'24 COLLECTION"}
        description={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
        }
      />
      <Season
        title={"FALL 2024"}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              blanditiis? Eveniet iste repellendus dolores incidunt aspernatur"
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
