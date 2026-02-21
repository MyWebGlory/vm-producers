const VMLogoMark = ({ className = "", size = 32, color = "currentColor" }: { className?: string; size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Geometric V mark inspired by VM Producers brand */}
    <path
      d="M20 34L4 8h8l8 16 8-16h8L20 34z"
      fill={color}
    />
    <path
      d="M20 28L9 8h6l5 10 5-10h6L20 28z"
      fill={color}
      opacity="0.3"
    />
  </svg>
);

export default VMLogoMark;
