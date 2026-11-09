import { getPopularMovies } from "@/service/tmdbmovieservice";
import Image from "next/image";
import { WrapperHome } from "./home/components/WrapperHome";

export default function Home() {
  return (
    <>
      <WrapperHome />
    </>
  );
}
