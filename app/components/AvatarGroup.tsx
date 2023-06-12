import { User } from '@prisma/client';
import Image from 'next/image';

interface AvatarGroupProps {
  users?: User[];
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users = []
}) => {
  // The positionMap is defined as an object with different positions based on the number of users.
  // We use nested objects to accommodate different positions for 3 and 4 users.
  const positionMap = {
    3: {
      0: 'top-0 left-[12px]',
      1: 'bottom-0',
      2: 'bottom-0 right-0',
    },
    4: {
      0: 'top-0 left-0',
      1: 'top-0 right-0',
      2: 'bottom-0',
      3: 'bottom-0 right-0',
    },
  };
  // We get the number of users to display. We want to display a maximum of 4 users.
  const numUsers = Math.min(users.length, 4);
  // The slicedUsers array is created based on the numUsers variable, slicing the original users array accordingly.
  const slicedUsers = users.slice(0, numUsers);

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, index) => (
        <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden
        h-[21px] w-[21px] ${positionMap[numUsers][index as keyof typeof positionMap[typeof numUsers]]}
        `}>
          <Image
            src={user?.image || '/images/placeholder.svg'}
            alt="Avatar"
            fill
          />
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup;
