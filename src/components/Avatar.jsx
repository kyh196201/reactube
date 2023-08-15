export default function Avatar(props) {
  const { thumbnail, title, className = '' } = props;

  return (
    <div className={`block w-9 h-9 ${className}`}>
      <img
        className="w-full h-full object-cover rounded-full"
        src={thumbnail}
        alt={title}
      />
    </div>
  );
}
