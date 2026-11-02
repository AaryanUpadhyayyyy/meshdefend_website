export function ResOCJourney({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <iframe
        src="/animations/resoc-animation/index.html?embed=1"
        title="ResOC animated resilience journey"
        loading="eager"
        scrolling="no"
      />
    </div>
  );
}
