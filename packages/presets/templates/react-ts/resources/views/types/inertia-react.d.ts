// @ts-nocheck
declare module '@inertiajs-revamped/react' {
  interface PageProps {
    auth: {
      user: string
    }
    versions: {
      php: string
      laravel: string
    }
  }

  interface HomePageProps extends PageProps {
    someProp: {
      availableForHomePage: string
    }
  }
}

export {}
