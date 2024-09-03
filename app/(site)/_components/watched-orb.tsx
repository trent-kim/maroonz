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
  
  const WatchedOrb: React.FC<{
    position: Position;
    number: string;
    onClick: () => void;
    orbRef: React.RefObject<HTMLDivElement>;
    animationClass: AnimationClass;
    isSelected: boolean; // Pass selected state as a prop
  }> = ({ number, position, onClick, orbRef, animationClass, isSelected }) => {
    return (
      <div
        className="group rounded-full transition-all ease-in-out duration-sm hover:shadow-glow cursor-pointer"
        style={{
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${position.width}px`,
          height: `${position.height}px`,
          animation: animations[animationClass], // Inline animation assignment
        }}
        onClick={onClick}
      >
        <div
          ref={orbRef}
          className={`font-mono text-sm w-lg h-lg border border-white rounded-full flex justify-center items-center opacity-100 transition-all ease-in-out duration-md ${
            isSelected ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          {number}
        </div>
      </div>
    );
  };
  
  export default WatchedOrb;
  