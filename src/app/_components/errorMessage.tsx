interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    {message}
  </div>
);

export default ErrorMessage;
