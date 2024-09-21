<?php

namespace Inertia\Ssr;

class BundleDetector
{
    public function detect()
    {
        return collect([
            config('inertia.ssr.bundle'),
            base_path('bootstrap/ssr/ssr.js'),
            base_path('bootstrap/ssr/ssr.mjs'),
            public_path('js/ssr.js'),
        ])->filter()->first(function ($path) {
            return file_exists($path);
        });
    }
}
