import { Logo } from "@/types/Logo";
import Image from "next/image";

const LogoAnimation: React.FC<{
  isEighteen: boolean;
  isDrift: boolean;
  logo: Logo[];
  logoAnimationContainerRef: React.RefObject<HTMLDivElement>;
}> = ({ isEighteen, logo, isDrift, logoAnimationContainerRef }) => {
  return (
    <div
      ref={logoAnimationContainerRef}
      className="row-start-2 row-span-2 col-start-1 md:col-start-2 xl:col-start-2 col-span-1 md:col-span-1 xl:col-span-3 flex items-center justify-center opacity-0 invisible"
    >
      <Image
        src={logo[0].image}
        width={62}
        height={62}
        priority
        className="h-full w-auto"
        alt=""
      />
    </div>
  );
};

export default LogoAnimation;
