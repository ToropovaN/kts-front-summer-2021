type avatarProps = {
  name: string;
  avatar_url?: string;
};

const Avatar: React.FC<avatarProps> = ({ name, avatar_url }) => {
  return (
    <div className="card__avatar">
      {avatar_url && <img className="card__img" src={avatar_url} alt={name} />}
      {!avatar_url && <div className="card__letter">{name}</div>}
    </div>
  );
};

export default Avatar;
