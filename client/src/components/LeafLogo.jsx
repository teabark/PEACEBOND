function LeafLogo({ className = "h-9 w-9" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-full bg-earth-olive/15 text-earth-olive shadow-sm shadow-earth-soil/10 ${className}`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 4.5C12.8 4.8 7.7 8 5.4 13.8c3.6.9 7.4-.1 10.1-2.8 1.9-1.9 3.4-4.2 4.5-6.5Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M4 20c2.7-5.7 6.7-9.4 12-11"
          stroke="#5a3e2b"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

export default LeafLogo;
