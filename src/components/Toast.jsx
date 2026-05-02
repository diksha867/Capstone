const Toast = ({ message }) => (
  <div className="fixed right-4 top-4 z-50 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
    {message}
  </div>
);

export default Toast;
