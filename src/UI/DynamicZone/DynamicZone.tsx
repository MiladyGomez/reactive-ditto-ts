import { lazy, Suspense } from 'react';

/**
 * Map ACF acf_fc_layout names to lazy-loaded React components.
 * Add a new entry here every time a new ACF flexible content layout is created.
 * The key MUST match the acf_fc_layout string returned by the REST API.
 */
const lazyComponents: Record<string, React.LazyExoticComponent<React.ComponentType<{ content: any }>>> = {
    // Example: Hello: lazy(() => import('@components/Hello/Hello')),
};

const DynamicZone: React.FC<{ component: any }> = ({ component }) => {
    const Component = lazyComponents[component.acf_fc_layout];
    return (
        <Suspense fallback={null}>
            {Component ? <Component content={component} /> : null}
        </Suspense>
    );
};

export default DynamicZone;
