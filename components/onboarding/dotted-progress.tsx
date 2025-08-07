interface DottedProgressProps {
  totalSteps: number;
  currentStep: number;
}

export function DottedProgress({ totalSteps, currentStep }: DottedProgressProps) {
  return (
    <div className="flex items-center justify-center w-full py-4">
      <div className="flex items-center">
        {[...Array(totalSteps)].map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentStep ? 'bg-[#FAFAFA]' : 'bg-gray-600'
              }`}
            />
            {index < totalSteps - 1 && (
              <div className="w-10 h-0.5 bg-gray-600 mx-1" style={{ borderStyle: 'dotted' }}/>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
