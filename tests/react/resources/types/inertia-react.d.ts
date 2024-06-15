declare module '@inertiajs-revamped/react' {
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
}

export {}
