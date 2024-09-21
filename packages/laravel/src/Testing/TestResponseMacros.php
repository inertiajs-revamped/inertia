<?php

namespace Inertia\Testing;

use Closure;

class TestResponseMacros
{
    public function assertInertia()
    {
        return function (Closure $callback = null) {
            /** @var \Illuminate\Testing\TestResponse $this */
            $assert = AssertableInertia::fromTestResponse($this);

            if (is_null($callback)) {
                return $this;
            }

            $callback($assert);

            return $this;
        };
    }

    public function inertiaPage()
    {
        return function () {
            /** @var \Illuminate\Testing\TestResponse $this */
            return AssertableInertia::fromTestResponse($this)->toArray();
        };
    }
}
