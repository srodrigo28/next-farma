export function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }, (_, index) => {
        const active = index <= current;

        return (
          <span
            key={`step-${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              active ? "w-10 bg-primary" : "w-8 bg-border"
            }`}
          />
        );
      })}
    </div>
  );
}
