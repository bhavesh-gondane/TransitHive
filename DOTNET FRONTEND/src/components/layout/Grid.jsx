import PropTypes from 'prop-types';

const Grid = ({ 
  children, 
  columns = 1,
  gap = '1rem',
  className = '',
  style = {} 
}) => {
  return (
    <div 
      className={`grid grid-cols-${columns} ${className}`}
      style={{ 
        gap,
        ...style
      }}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
  gap: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Grid;