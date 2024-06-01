export const fadeIn = (delay, duration, direction, type, distance = 200) => ({
  hidden: {
    opacity: 0,
    y: direction === 'up' ? -distance : direction === 'down' ? distance : 0,
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: type || 'ease',
      delay: delay,
      duration: duration,
    },
  },
});

export const navLinks = (delay) => ({
  initial: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay: delay,
      type: 'spring',
      duration: 1,
      stiffness: 400,
      damping: 25,
    },
  },
});
