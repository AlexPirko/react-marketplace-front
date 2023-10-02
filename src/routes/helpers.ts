export const pathsPublic: { [k: string]: string } = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  productDetailed: '/product/:idOrSlug',
  favorites: '/favorites',
  cart: '/cart',
};

export const pathsPrivate: { [k: string]: string } = {
  profile: '/profile',
};

export const paths: { [k: string]: string } = Object.assign(
  {},
  pathsPublic,
  pathsPrivate
);

export const checkPathMatch = (
  pathname: string,
  paths: { [k: string]: string }
) => {
  let isMatch = false;

  const allPaths = Object.keys(paths).map((key) => paths[key]);
  const pathFirstSection = pathname.split('/')[1];

  allPaths.forEach((path) => {
    if (path.slice(1) === pathFirstSection) isMatch = true;
  });

  return isMatch;
};
