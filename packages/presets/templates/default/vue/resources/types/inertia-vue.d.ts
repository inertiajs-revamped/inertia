// @ts-nocheck
declare module '@inertiajs-revamped/vue' {
  interface PageProps {
    // Define default shared interface with module augmentation
    auth: {
      user: string
    }
    versions: {
      php: string
      laravel: string
    }
  }

  interface HomePageProps extends PageProps {
    // Define specific Component interface with module augmentation
    someProp: {
      availableForHomePage: string
    }
  }

  interface LayoutProps {
    // Define shared interface with module augmentation
  }
}

export {}
