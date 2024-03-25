import {
  CaretUpFilled,
  CaretDownFilled,
  CaretLeftFilled,
  CaretRightFilled
} from '@ant-design/icons'
import PropTypes from 'prop-types'

const CaretFilled = (props) => {
  const icon = props.icon
  console.log(icon)
  if (icon === 'up') {
    return <CaretUpFilled />
  } else if (icon === 'down') {
    return <CaretDownFilled />
  } else if (icon === 'left') {
    return <CaretLeftFilled />
  } else if (icon === 'right') {
    return <CaretRightFilled />
  } else {
    return null
  }
}

CaretFilled.propTypes = {
  icon: PropTypes.oneOf(['up', 'down', 'left', 'right', ''])
}
export default CaretFilled
