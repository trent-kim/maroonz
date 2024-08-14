
const AgeVerification: React.FC = ({}) => {
  return (
    <div className="border border-white rounded p-sm flex flex-col gap-sm">
      <div className="font-mono text-sm text-white">Are you 18 years old or older?</div>
      <div className="font-serif text-md text-white">
        <span className="hover:text-shadow-glow transition-[text-shadow] ease-in-out duration-1.5 cursor-pointer">
          Yes
        </span>
      </div>
      <div className="font-serif text-md text-white">
        <span className="hover:text-shadow-glow transition-[text-shadow] ease-in-out duration-1.5 cursor-pointer">
          No
        </span>
      </div>
    </div>
  );
};

export default AgeVerification;
