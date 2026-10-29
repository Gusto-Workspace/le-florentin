export default function DiagonalArrow({ className = '' }) {
  return (
    <svg
      className={`diagonal-arrow ${className}`.trim()}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  );
}
