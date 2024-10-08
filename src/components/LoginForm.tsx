import Image from 'next/image';

import '@/styles/components/login-form.scss';

import { Button } from '@/components/ui/button';
import { Card, CardContent,CardFooter,CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

  //   const [dataLogin, setDataLogin] = useState<loginType>({
  //     email: '',
  //     password: '',
  //     checkAgree: false
  //   })

  //   const router = useRouter()

  //   const handleChangePassword = (e: any) => {
  //     setDataLogin((prev) => ({ ...prev, password: e.target.value }))
  //   }

  //   const handleChangeEmail = (e: any) => {
  //     setDataLogin((prev) => ({ ...prev, email: e.target.value }))
  //   }

  //   const handleCheckBox = (e: any) => {
  //     setDataLogin((prev) => ({ ...prev, checkAgree: e.target.checked }))
  //   }
  //   const handleLogin = () => {
  //     router.push('/')
  //     setDataLogin({
  //       email: '',
  //       password: '',
  //       checkAgree: false
  //     })
  //     // if (dataLogin.email && dataLogin.password && dataLogin.checkAgree) {
  //     //     router.push('/')
  //     //     setDataLogin({
  //     //         email: '',
  //     //         password: '',
  //     //         checkAgree: false
  //     //     })
  //     // } else {
  //     //     alert('Unable to log in, please check again !')
  //     // }
  //   }

export default function LoginForm() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={12}
          height={12}
          alt="Your Company"
          src="/next.svg"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight" style={{ color: 'var(--next-theme-color)' }}>
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Card>
          <CardHeader>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight" style={{ color: 'var(--next-theme-color)' }}>
              Sign in to your account
            </h2>
          </CardHeader>
          <CardContent>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium leading-6" style={{ color: 'var(--next-theme-color)' }}>
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  style={{ color: 'var(--next-theme-color)' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                    style={{ color: 'var(--next-theme-color)' }}
                  >
                    Password
                  </Label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"
                      style={{ color: 'var(--next-theme-color)' }}
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    style={{ color: 'var(--next-theme-color)' }}
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  style={{ color: 'var(--next-theme-color)' }}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <p className="mt-10 text-center text-sm text-gray-500" style={{ color: 'var(--next-theme-color)' }}>
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}