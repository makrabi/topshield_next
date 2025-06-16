// src/app/[locale]/login/page.tsx

import { type FC } from 'react'
import LoginForm from './LoginForm'

// لا تستخدم PageProps من next لأنه غير مخصص للاستيراد من هناك
// واستخدامه يسبب فشل التحقق من الأنواع في Next.js 15
// لذلك نحدد النوع يدويًا

type Props = {
  params: {
    locale: string
  }
}

const LoginPage: FC<Props> = ({ params }) => {
  return <LoginForm locale={params.locale} />
}

export default LoginPage
