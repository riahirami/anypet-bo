import { Link, LinkProps } from 'react-router-dom';
import { styled } from '@mui/system';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, ...rest }) => {
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
};

export default CustomLink;
