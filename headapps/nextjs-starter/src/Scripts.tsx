// The BYOC bundle imports external (BYOC) components into the app and makes sure they are ready to be used
import BYOC from 'src/byoc';
import CdpPageView from 'components/CdpPageView';
import FEAASScripts from 'components/FEAASScripts';
import EditingScripts from 'components/EditingScripts';

const Scripts = (): JSX.Element => {
    return (
        <>
            <BYOC />
            <CdpPageView />
            <FEAASScripts />
            <EditingScripts />
        </>
    );
};

export default Scripts;
