import { lazy, Suspense } from 'react';
import DynamicZoneProps from '@interface/dynamicZone';

// Components
// const Example = lazy(() => import('@components/Example/Example'))

const DynamicZone: React.FC<DynamicZoneProps> = ({ numb, component, content, id }) => {
    return (
        <Suspense fallback={<div></div>}>
            {/* {component === 'TextBlock1' ? <Example numb={numb} content={content} /> : null} */}
        </Suspense>
    )
}

export default DynamicZone;