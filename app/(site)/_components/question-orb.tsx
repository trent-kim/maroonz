interface Position {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  type AnimationClass = 'up-down-one' | 'up-down-two' | 'up-down-three';

  const animations: Record<AnimationClass, string> = {
    'up-down-one': 'up-down-one 3s linear infinite',
    'up-down-two': 'up-down-two 3s linear infinite',
    'up-down-three': 'up-down-three 3s linear infinite',
  };

  const QuestionOrb: React.FC<{
    position: Position;
    onClick: () => void;
    orbRef: React.RefObject<HTMLDivElement>;
    animationClass: AnimationClass;
    isSelected: boolean;
  }> = ({ position, onClick, orbRef, animationClass, isSelected }) => {

    
    return (
      <div
        className={`group rounded-full  transition-all ease-in-out duration-sm  ${
          !isSelected && (orbRef.current?.style.visibility != 'hidden' ? 'hover:shadow-glow cursor-pointer' : 'cursor-default')
        }`}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${position.width}px`,
          height: `${position.height}px`,
          animation: animations[animationClass], // Inline animation assignment

        }}
      >
        <div
               ref={orbRef}
               onClick={onClick}
               className="font-mono text-sm text-white w-lg h-lg border border-white rounded-full flex justify-center items-center opacity-100 bg-none transition-all ease-in-out duration-md"
        >
        ?
        </div>
      </div>
    );
  };

  export default QuestionOrb;