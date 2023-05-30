'use client';
import clsx from "clsx";
import link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active: boolean;
  onClick: () => void;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  icon,
  href,
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li>
      
    </li>
  );
};

export default DesktopItem;
