'use client'
import Link from 'next/link'
import clsx from 'clsx'

interface MobileItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const MobileItem: React.FC<MobileItemProps> = ({
  href,
  icon: Icon,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link href={href} onClick={onClick}
    className={clsx(`flex group gap-x-3 justify-center text-sm leading-6
    font-semibold p-4 text-gray-500 hover:text-black
    hover:bg-gray-100 w-full`, active && 'bg-gray-100 text-black')}
    >
      <Icon className="h-6 w-6"/>
    </Link>
  )
}

export default MobileItem
