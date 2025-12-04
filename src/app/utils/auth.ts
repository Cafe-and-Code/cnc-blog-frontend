import { Cookies } from 'react-cookie';

import { AUTH } from '@/constants/redirect';

export const logoutAndRedirect = () => {
  const cookies = new Cookies();
  cookies.remove('userId');
  cookies.remove('userRole');
  window.location.href = `/${AUTH.LOGIN}`;
};
