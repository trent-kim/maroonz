import { Logo } from "@/types/Logo";
import Image from "next/image";

const LogoAnimation: React.FC<{isEighteen: boolean, isDrift: boolean, logo: Logo[];}> = ({isEighteen, logo, isDrift}) => {

  return (
    <div className="row-start-2 row-span-2 col-start-2 col-span-3 flex items-center justify-center">
      <Image
          src={logo[0].image}
          width={62}
          height={62}
          className={`h-full w-auto transition-all ease-in-out duration-md ${!isDrift ? (isEighteen ? "opacity-0 invisible" : "opacity-100 visible") : ("opacity-0 invisible")}`}
          alt=""
        />
    </div>
    
    // <div className="row-start-1 row-span-4 col-start-1 col-span-5 flex items-center justify-center">
    //     <Image
    //         src="/icon-white.gif"
    //         width={62}
    //         height={62}
    //         className={`${isEighteen ? 'animate-move-and-scale' : 'scale-[7.5]'}`}
    //         alt=""
    //       />
    // </div>
  );
};

export default LogoAnimation;
