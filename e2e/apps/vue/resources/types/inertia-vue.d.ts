declare module '@inertiajs-revamped/vue' {
  interface PageProps {
    example?: string
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

  interface DumpProps extends PageProps {
    headers: any
    method: string
    form: any
    files: string[]
    query: any
    page: Page
  }
}

export {}
