const Error = ({ children }) => {
  return (
    <div className="text-center bg-red-600 text-white font-bold p-3 uppercase mt-2">
      {children}
    </div>
  );
};

export default Error;
