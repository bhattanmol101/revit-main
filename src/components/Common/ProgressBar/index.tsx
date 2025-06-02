export default function ProgressBar({ currentStep, totalSteps }: any) {
  const percent = (currentStep / totalSteps) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
      <div
        className="bg-green-500 h-2 rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
