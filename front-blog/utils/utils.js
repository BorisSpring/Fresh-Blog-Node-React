import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import { formatDistance } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}

export function formatDistanceUtils(date, suffix = true) {
  return formatDistance(date, Date.now(), { addSuffix: suffix });
}

export function getImageUrl(imageName, type = 'blog') {
  return `http://localhost:3000/images/${
    type === 'user' ? 'users/' : 'blogs/'
  }${imageName}`;
}
