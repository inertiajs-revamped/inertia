<?php

namespace Inertia;

use Closure;
use Inertia\Support\Header;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\App;
use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Support\Traits\Macroable;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceResponse;
use Illuminate\Support\Facades\Response as ResponseFactory;

class Response implements Responsable
{
    use Macroable;

    protected $component;
    protected $props;
    protected $persisted;
    protected $rootView;
    protected $version;
    protected $viewData = [];

    /**
     * @param array|Arrayable $props
     */
    public function __construct(string $component, array $props, string $rootView = 'app', string $version = '', array $persisted = [])
    {
        $this->component = $component;
        $this->props = $props instanceof Arrayable ? $props->toArray() : $props;
        $this->persisted = $persisted;
        $this->rootView = $rootView;
        $this->version = $version;
    }

    /**
     * @param string|array $key
     *
     * @return $this
     */
    public function with($key, $value = null): self
    {
        if (is_array($key)) {
            $this->props = array_merge($this->props, $key);
        } else {
            $this->props[$key] = $value;
        }

        return $this;
    }

    /**
     * @param string|array $key
     *
     * @return $this
     */
    public function withViewData($key, $value = null): self
    {
        if (is_array($key)) {
            $this->viewData = array_merge($this->viewData, $key);
        } else {
            $this->viewData[$key] = $value;
        }

        return $this;
    }

    public function rootView(string $rootView): self
    {
        $this->rootView = $rootView;

        return $this;
    }

    /**
     * Create an HTTP response that represents the object.
     *
     * @param Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        $only = array_filter(explode(',', $request->header('X-Inertia-Partial-Data', '')));

        $props = ($only && $request->header('X-Inertia-Partial-Component') === $this->component)
            ? Arr::only($this->props, $only)
            : array_filter($this->props, static function ($prop) {
                return ! ($prop instanceof LazyProp);
            });

        $props = $this->resolveProperties($request, $this->props);

        $page = [
            'component' => $this->component,
            'props' => $props,
            'url' => $this->url($request),
            'version' => $this->version,
        ];

        if ($request->header(Header::INERTIA)) {
            return new JsonResponse($page, 200, [Header::INERTIA => 'true']);
        }

        return ResponseFactory::view($this->rootView, $this->viewData + ['page' => $page]);
    }

    /**
     * Resolve the properites for the response.
     */
    public function resolveProperties(Request $request, array $props): array
    {
        $isPartial = $request->header(Header::PARTIAL_COMPONENT) === $this->component;

        if(!$isPartial) {
            $props = array_filter($this->props, static function ($prop) {
                return ! ($prop instanceof LazyProp);
            });
        }

        $props = $this->resolveArrayableProperties($props, $request);

        if($isPartial && $request->hasHeader(Header::PARTIAL_ONLY)) {
            $props = $this->resolveOnly($request, $props);
        }

        $props = $this->resolvePropertyInstances($props, $request);

        return $props;
    }

    /**
     * Resolve all arrayables properties into an array.
     */
    public function resolveArrayableProperties(array $props, Request $request, bool $unpackDotProps = true): array
    {
        foreach ($props as $key => $value) {
            if ($value instanceof Arrayable) {
                $value = $value->toArray();
            }

            if (is_array($value)) {
                $value = $this->resolveArrayableProperties($value, $request, false);
            }

            if ($unpackDotProps && str_contains($key, '.')) {
                Arr::set($props, $key, $value);
                unset($props[$key]);
            } else {
                $props[$key] = $value;
            }
        }

        return $props;
    }

    /**
     * Resolve the `only` partial request props.
     */
    public function resolveOnly(Request $request, array $props): array
    {
        $only = array_merge(
            array_filter(explode(',', $request->header(Header::PARTIAL_ONLY, ''))),
            $this->persisted
        );

        $value = [];

        foreach($only as $key) {
            Arr::set($value, $key, data_get($props, $key));
        }

        return $value;
    }

    /**
     * Resolve all necessary class instances in the given props.
     */
    public function resolvePropertyInstances(array $props, Request $request): array
    {
        foreach ($props as $key => $value) {
            if ($value instanceof Closure) {
                $value = App::call($value);
            }

            if ($value instanceof LazyProp) {
                $value = App::call($value);
            }

            if ($value instanceof PromiseInterface) {
                $value = $value->wait();
            }

            if ($value instanceof ResourceResponse || $value instanceof JsonResource) {
                $value = tap($value, static function ($value) {
                    $value->withoutWrapping();
                })->toResponse($request)->getData(true);
            }

            if ($value instanceof Arrayable) {
                $value = $value->toArray();
            }

            if (is_array($value)) {
                $value = $this->resolvePropertyInstances($value, $request);
            }

            $props[$key] = $value;
        }

        return $props;
    }

    protected function url(Request $request): string
    {
        $url = Str::after($request->url(), $request->getSchemeAndHttpHost());
        $url = Str::start($url, '/');

        $queryString = $request->getQueryString();
        if ($queryString === null) {
            return $url;
        }

        return $url.'?'.urldecode($queryString);
    }
}
