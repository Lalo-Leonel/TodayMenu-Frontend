export const AButton = ({ children, className, ...props }) => (
    <button
      className={`flex text-primary bg-secondary hover:bg-secondary-200 focus:ring-3 focus:ring-secondary font-bold rounded-lg w-full p-2 justify-center ${className}`}
      {...props}>
      {children}
    </button>
  );
  